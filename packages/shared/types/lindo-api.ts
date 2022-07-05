import { IJsonPatch } from 'mobx-state-tree'
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
}
