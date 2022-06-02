import { RootStoreSnapshot, IJsonPatch } from '@lindo/shared'

export {}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    // Expose some Api through preload script
    fs: typeof import('fs')
    ipcRenderer: import('electron').IpcRenderer
    removeLoading: () => void
    forwardPatchToMain: (patch: IJsonPatch) => void
    fetchInitialStateAsync: () => Promise<RootStoreSnapshot>
    subscribeToIPCPatch: (callback: (patch: IJsonPatch) => void) => void
  }
}
