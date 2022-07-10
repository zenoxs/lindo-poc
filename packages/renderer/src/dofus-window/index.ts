import { CharacterDisplayClass } from './character-display'
import { Dofus } from './dofus'
import { GUI } from './gui'
import { IsoEngine } from './iso-engine'

export * from './dofus'
export * from './gui'
export * from './iso-engine'
export * from './character-display'

export interface DofusWindow extends Window {
  d: {
    recordActivity: () => void
  }
  initDofus: (callback: () => void) => void
  openDatabase: unknown
  dofus: Dofus
  foreground: {
    rootElement: HTMLDivElement
  }
  gui: GUI
  isoEngine: IsoEngine
  CharacterDisplay: CharacterDisplayClass
}

export interface HTMLIFrameElementWithDofus extends HTMLIFrameElement {
  contentWindow: DofusWindow
}
