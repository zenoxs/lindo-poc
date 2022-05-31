import fs from 'fs'
import { contextBridge, ipcRenderer } from 'electron'
import { domReady } from './utils'
import { useLoading } from './loading'
import { IJsonPatch } from 'mobx-state-tree';
import { IPCEvents } from '@lindo/shared';

const { appendLoading, removeLoading } = useLoading()

;(async () => {
  await domReady()

  appendLoading()
})()

// --------- Expose some API to the Renderer process. ---------
contextBridge.exposeInMainWorld('fs', fs)
contextBridge.exposeInMainWorld('removeLoading', removeLoading)
contextBridge.exposeInMainWorld('ipcRenderer', withPrototype(ipcRenderer))

const forwardPatchToMain = (patch: IJsonPatch) => {
  ipcRenderer.send(IPCEvents.PATCH, patch)
}

const fetchInitialStateAsync = async () => {
  const data = await ipcRenderer.invoke(IPCEvents.INIT_STATE_ASYNC)
  return JSON.parse(data);
}

// mobx
contextBridge.exposeInMainWorld('forwardPatchToMain', forwardPatchToMain)
contextBridge.exposeInMainWorld('fetchInitialStateAsync', fetchInitialStateAsync)

// `exposeInMainWorld` can't detect attributes and methods of `prototype`, manually patching it.
function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj)

  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) continue

    if (typeof value === 'function') {
      // Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
      obj[key] = function (...args: any) {
        return value.call(obj, ...args)
      }
    } else {
      obj[key] = value
    }
  }
  return obj
}
