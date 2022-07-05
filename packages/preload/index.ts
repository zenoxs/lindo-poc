import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import { domReady } from './utils'
import { IJsonPatch } from 'mobx-state-tree'
import { GameContext, IPCEvents, LindoAPI, LindoTitleBar, RootStoreSnapshot, UpdateProgress } from '@lindo/shared'
import { Titlebar, Color } from 'custom-electron-titlebar'
;(async () => {
  await domReady()
})()

window.addEventListener('DOMContentLoaded', () => {
  // only display custom titlebar for main windows
  if (window.location.hash !== '') {
    return
  }
  const titleBar = new Titlebar({
    backgroundColor: Color.fromHex('#121212')
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const titlebarRef: HTMLDivElement = (titleBar as any).titlebar

  titlebarRef.addEventListener('dblclick', () => {
    ipcRenderer.send(IPCEvents.TOGGLE_MAXIMIZE_WINDOW)
  })

  titleBar.updateTitle('Lindo')
  const lindoTitleBar: LindoTitleBar = {
    updateTitle: (title: string) => titleBar.updateTitle(title),
    height: titlebarRef.clientHeight + 'px'
  }
  contextBridge.exposeInMainWorld('titleBar', lindoTitleBar)
})

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

// Hotkeys
const subscribeToNewTab = (callback: () => void): (() => void) => {
  const listener = (_: IpcRendererEvent) => {
    callback()
  }
  ipcRenderer.on(IPCEvents.NEW_TAB, listener)

  return () => {
    ipcRenderer.removeListener(IPCEvents.NEW_TAB, listener)
  }
}

const subscribeToNextTab = (callback: () => void): (() => void) => {
  const listener = (_: IpcRendererEvent) => {
    callback()
  }
  ipcRenderer.on(IPCEvents.NEXT_TAB, listener)

  return () => {
    ipcRenderer.removeListener(IPCEvents.NEXT_TAB, listener)
  }
}

const subscribeToPrevTab = (callback: () => void): (() => void) => {
  const listener = (_: IpcRendererEvent) => {
    callback()
  }
  ipcRenderer.on(IPCEvents.PREV_TAB, listener)

  return () => {
    ipcRenderer.removeListener(IPCEvents.PREV_TAB, listener)
  }
}

const subscribeToCloseTab = (callback: () => void): (() => void) => {
  const listener = (_: IpcRendererEvent) => {
    callback()
  }
  ipcRenderer.on(IPCEvents.CLOSE_TAB, listener)

  return () => {
    ipcRenderer.removeListener(IPCEvents.CLOSE_TAB, listener)
  }
}

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

// Context
const fetchGameContext = async (): Promise<GameContext> => {
  const data = await ipcRenderer.invoke(IPCEvents.GET_GAME_CONTEXT)
  return JSON.parse(data)
}

// Window
const openOptionWindow = (): void => {
  ipcRenderer.send(IPCEvents.OPEN_OPTION)
}

const focusCurrentWindow = (): void => {
  ipcRenderer.send(IPCEvents.FOCUS_WINDOW)
}

const lindoApi: LindoAPI = {
  fetchInitialStateAsync,
  forwardPatchToMain,
  subscribeToIPCPatch,
  subscribeToNewTab,
  subscribeToNextTab,
  subscribeToPrevTab,
  subscribeToCloseTab,
  subscribeToUpdateProgress,
  fetchGameContext,
  openOptionWindow,
  focusCurrentWindow
}
contextBridge.exposeInMainWorld('lindoAPI', lindoApi)
