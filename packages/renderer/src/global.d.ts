import { RootStoreSnapshot, IJsonPatch, UpdateProgress, GameContext } from '@lindo/shared'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    // Expose some Api through preload script
    fs: typeof import('fs')
    ipcRenderer: import('electron').IpcRenderer
    removeLoading: () => void
    // mobx
    forwardPatchToMain: (patch: IJsonPatch) => void
    fetchInitialStateAsync: () => Promise<RootStoreSnapshot>
    subscribeToIPCPatch: (callback: (patch: IJsonPatch) => void) => () => void
    // updater
    subscribeToUpdateProgress: (callback: (updateProgress: UpdateProgress) => void) => () => void
    // context
    fetchGameContext: () => Promise<GameContext>
  }
}
