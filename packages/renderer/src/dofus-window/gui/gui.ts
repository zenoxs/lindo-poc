import TypedEmitter from 'typed-emitter'
import { CharacterDisplay } from './character-display'
import { CharacterBaseInformations } from '../iso-engine'
import { Chat } from './chat'
import { FightManager } from './fight-manager'
import { PlayerData } from './player-data'
import { Scroller } from './scroller'

export interface GUIElement {
  id: string
  _contentType: 'wui' | undefined
  _childrenList: Array<GUIElement>
  rootElement: HTMLDivElement
  setText: (text: string) => boolean
  hasClassName: (className: string) => boolean
}

export interface GUICanvas {
  rootElement: HTMLCanvasElement
}

export interface GUIText extends GUIElement {}

export interface GUIButton extends GUIElement {
  isEnable: () => boolean
  setEnable: (enable: boolean) => void
  cancelTap: () => void
  tap: () => void
}

export interface GUITableRowContent<T> extends GUIButton {
  data?: T
}

export interface GUITable<T> extends GUIElement {
  content: {
    _childrenList: Array<GUITableRowContent<T>>
  }
}

export interface WUIElement extends GUIElement {
  isVisible: () => boolean
  close: () => void
  _childrenList: Array<GUIElement>
  _contentType: 'wui'
}

export interface GUIDialog extends GUIElement {
  isVisible: () => boolean
  close: () => void
  _childrenList: Array<GUIElement>
}

export interface WindowOpenEvent {
  id: string
  tabId: string
  itemData: {
    _type: string
  }
  _messageType: string
}
export type GUIWindowEvents = {
  open: (event: WindowOpenEvent) => void
  opened: () => void
}
export interface GUIWindowSchema extends GUIElement, TypedEmitter<GUIWindowEvents> {
  id: 'itemRecipes' | 'bidHouseShop' | 'grimoire' | 'social' | 'equipment' | 'characterSelection' | 'recaptcha'
  isVisible: () => boolean
  close: () => void
  openState: boolean
}

export interface GenericWindow extends GUIWindowSchema {
  id: 'itemRecipes' | 'bidHouseShop' | 'grimoire' | 'social' | 'recaptcha'
  storageBox: {}
}

export interface EquipmentWindow extends GUIWindowSchema {
  id: 'equipment'
  storageBox: GUIElement
}

export interface CharacterSelection extends GUIWindowSchema {
  id: 'characterSelection'
  characterDisplay: CharacterDisplay
  btnCreate: GUIButton
  btnDelete: GUIButton
  btnPlay: GUIButton
  selectedCharacter?: CharacterBaseInformations
  charactersTable: GUITable<CharacterBaseInformations>
}

export type GUIWindow = EquipmentWindow | GenericWindow | CharacterSelection

export interface ChallengeIcon {
  description: string
  details: unknown
  icon: {
    rootElement: HTMLDivElement
  }
  iconUrl: string
  name: string
  points: number
  xpBonus: number
}

export type SlotEvents = {
  doubletap: () => void
}
export interface Slot extends TypedEmitter<SlotEvents> {
  tap: () => void
}

export interface GameFightTurnStartMessage {
  id: number
  waitTime: number
  _isInitialized: false
  _messageType: 'GameFightTurnStartMessage'
}

export type GUIEvents = {
  disconnect: () => void
  resize: () => void
  spellSlotSelected: (spellId: number) => void
  spellSlotDeselected: () => void
  GameActionFightDeathMessage: (event: { targetId: number }) => void
  GameFightTurnStartMessage: (msg: GameFightTurnStartMessage) => void
  GameFightOptionStateUpdateMessage: () => void
  GameActionFightLifePointsLostMessage: () => void
  GameActionFightLifeAndShieldPointsLostMessage: () => void
  GameActionFightPointsVariationMessage: () => void
}

export interface GUI extends TypedEmitter<GUIEvents> {
  _resizeUi: () => void
  isConnected: boolean
  loginScreen: {
    _connectMethod: 'manual' | 'lastCharacter' | 'lastServer'
  }
  shopFloatingToolbar: {
    hide: () => void
    show: () => void
  }
  notificationBar: {
    _elementIsVisible: boolean
    currentOpenedId: string
    dialogs: Record<string, GUIDialog>
  }
  windowsContainer: {
    _childrenList: Array<GUIWindow>
    getChildren: () => Array<GUIWindow>
  }
  menuBar: {
    _icons: {
      _childrenList: Array<GUIButton>
    }
  }
  challengeIndicator: {
    iconDetailsListByChallengeId: Record<number, ChallengeIcon>
    rootElement: {
      classList: {
        add: (className: string) => void
        remove: (className: string) => void
      }
    }
  }
  shortcutBar: {
    _panels: {
      spell: {
        slotList: Array<Slot>
      }
      item: {
        slotList: Array<Slot>
      }
    }
  }
  playerData: PlayerData
  mainControls: {
    buttonBox: {
      _childrenList: {
        tap: () => void
      }[]
    }
  }
  numberInputPad: {
    _doDigit: (value: number) => void
    isVisible: () => boolean
    _doBackspace: () => void
    _doEnter: () => void
  }
  fightManager: FightManager
  timeline: {
    fightControlButtons: {
      toggleReadyForFight: () => void
    }
    fighterList: {
      rootElement: HTMLDivElement
    }
    fighterListScroller: Scroller
  }
  chat: Chat
}
