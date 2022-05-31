import { RootStoreSnapshot, IJsonPatch } from '@lindo/shared'
import type { Observable } from 'rxjs'
import type { ISerializedActionCall, IJsonPatch } from 'mobx-state-tree'

export {}

declare global {
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
