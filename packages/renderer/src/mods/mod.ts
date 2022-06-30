import { DofusWindow } from '@/dofus-window'
import { RootStore } from '@/store'

export abstract class Mod {
  protected readonly wGame: DofusWindow
  protected readonly rootStore: RootStore

  constructor(wGame: DofusWindow, rootStore: RootStore) {
    this.wGame = wGame
    this.rootStore = rootStore
  }

  abstract start(): void

  abstract close(): void
}
