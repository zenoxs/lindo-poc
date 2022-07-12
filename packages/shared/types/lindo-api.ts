import { IJsonPatch } from 'mobx-state-tree'
import { SaveCharacterImageArgs } from '../constants'
import { RootStoreSnapshot } from '../models'
import { GameContext } from './game-context'
import { UpdateProgress } from './update-progress'

export interface LindoTitleBar {
  updateTitle: (title: string) => void
  height: string
}

export interface LindoAPI {
  // mobx
  forwardPatchToMain: (patch: IJsonPatch) => void
  fetchInitialStateAsync: () => Promise<RootStoreSnapshot>
  subscribeToIPCPatch: (callback: (patch: IJsonPatch) => void) => () => void
  resetStore: () => void
  // hotkeys
  subscribeToNewTab: (callback: () => void) => () => void
  subscribeToNextTab: (callback: () => void) => () => void
  subscribeToPrevTab: (callback: () => void) => () => void
  subscribeToCloseTab: (callback: () => void) => () => void
  // updater
  subscribeToUpdateProgress: (callback: (updateProgress: UpdateProgress) => void) => void
  // context
  fetchGameContext: () => Promise<GameContext>
  // window
  openOptionWindow: () => void
  focusCurrentWindow: () => void
  closeOptionWindow: () => void
  // multi account
  saveMasterPassword: (masterPassword: string) => Promise<void>
  isMasterPasswordConfigured: () => Promise<boolean>
  saveCharacterImage: (args: SaveCharacterImageArgs) => void
}
