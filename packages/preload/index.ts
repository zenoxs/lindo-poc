import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import { domReady } from './utils'
import { IJsonPatch } from 'mobx-state-tree'
import { GameContext, IPCEvents, RootStoreSnapshot, UpdateProgress } from '@lindo/shared'
;(async () => {
  await domReady()
})()

// MOBX
const forwardPatchToMain = (patch: IJsonPatch): void => {
  ipcRenderer.send(IPCEvents.PATCH, patch)
}

const fetchInitialStateAsync = async (): Promise<RootStoreSnapshot> => {
  const data = await ipcRenderer.invoke(IPCEvents.INIT_STATE_ASYNC)
  return JSON.parse(data)
}

const subscribeToIPCPatch = (callback: (patch: IJsonPatch) => void): (() => void) => {
  const listener = (_: IpcRendererEvent, patch: IJsonPatch) => {
    callback(patch)
  }
  ipcRenderer.on(IPCEvents.PATCH, listener)

  return () => {
    ipcRenderer.removeListener(IPCEvents.PATCH, listener)
  }
}

contextBridge.exposeInMainWorld('forwardPatchToMain', forwardPatchToMain)
contextBridge.exposeInMainWorld('fetchInitialStateAsync', fetchInitialStateAsync)
contextBridge.exposeInMainWorld('subscribeToIPCPatch', subscribeToIPCPatch)

// Updater

const subscribeToUpdateProgress = (callback: (updateProgress: UpdateProgress) => void): (() => void) => {
  const listener = (_: IpcRendererEvent, updateProgress: UpdateProgress) => {
    callback(updateProgress)
  }
  ipcRenderer.on(IPCEvents.UPDATE_PROGRESS, listener)

  return () => {
    ipcRenderer.removeListener(IPCEvents.UPDATE_PROGRESS, listener)
  }
}

contextBridge.exposeInMainWorld('subscribeToUpdateProgress', subscribeToUpdateProgress)

// Context
const fetchGameContext = async (): Promise<GameContext> => {
  const data = await ipcRenderer.invoke(IPCEvents.GET_GAME_CONTEXT)
  return JSON.parse(data)
}

contextBridge.exposeInMainWorld('fetchGameContext', fetchGameContext)

// `exposeInMainWorld` can't detect attributes and methods of `prototype`, manually patching it.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj)

  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) continue

    if (typeof value === 'function') {
      // Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
      obj[key] = function (...args: Array<unknown>) {
        return value.call(obj, ...args)
      }
    } else {
      obj[key] = value
    }
  }
  return obj
}
