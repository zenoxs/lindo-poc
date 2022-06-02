import fs from 'fs'
import { contextBridge, ipcRenderer } from 'electron'
import { domReady } from './utils'
import { useLoading } from './loading'
import { IJsonPatch } from 'mobx-state-tree'
import { IPCEvents, RootStoreSnapshot } from '@lindo/shared'

const { appendLoading, removeLoading } = useLoading()

;(async () => {
  await domReady()

  appendLoading()
})()

// --------- Expose some API to the Renderer process. ---------
contextBridge.exposeInMainWorld('fs', fs)
contextBridge.exposeInMainWorld('removeLoading', removeLoading)
contextBridge.exposeInMainWorld('ipcRenderer', withPrototype(ipcRenderer))

// mobx

const forwardPatchToMain = (patch: IJsonPatch): void => {
  ipcRenderer.send(IPCEvents.PATCH, patch)
}

const fetchInitialStateAsync = async (): Promise<RootStoreSnapshot> => {
  const data = await ipcRenderer.invoke(IPCEvents.INIT_STATE_ASYNC)
  return JSON.parse(data)
}

const subscribeToIPCPatch = (callback: (patch: IJsonPatch) => void): void => {
  ipcRenderer.on(IPCEvents.PATCH, (_, patch: IJsonPatch) => {
    callback(patch)
  })
}

contextBridge.exposeInMainWorld('forwardPatchToMain', forwardPatchToMain)
contextBridge.exposeInMainWorld('fetchInitialStateAsync', fetchInitialStateAsync)
contextBridge.exposeInMainWorld('subscribeToIPCPatch', subscribeToIPCPatch)

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
