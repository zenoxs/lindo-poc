import TypedEmitter from 'typed-emitter'
import { Actor } from '../iso-engine'
import { CharacterStats } from './character-stats'
import { Chat } from './chat'
import { FightManager } from './fight-manager'
import { Scroller } from './scroller'
import { Spell } from './spell'

export interface GUIElement {
  tap: () => void
  hasClassName: (className: string) => boolean
  setText: (text: string) => boolean
  id: string
  _contentType: 'wui' | undefined
  _childrenList: Array<GUIElement>
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
  id: 'itemRecipes' | 'bidHouseShop' | 'grimoire' | 'social' | 'equipment'
  openState: boolean
}

export interface GenericWindow extends GUIWindowSchema {
  id: 'itemRecipes' | 'bidHouseShop' | 'grimoire' | 'social'
  storageBox: {}
}

export interface EquipmentWindow extends GUIWindowSchema {
  id: 'equipment'
  storageBox: GUIElement
}

export type GUIWindow = EquipmentWindow | GenericWindow

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

export type GUIEvents = {
  disconnect: () => void
  resize: () => void
  spellSlotSelected: (spellId: number) => void
  spellSlotDeselected: () => void
  GameActionFightDeathMessage: (event: { targetId: number }) => void
  GameFightTurnStartMessage: (actor: Actor) => void
  GameFightOptionStateUpdateMessage: () => void
  GameActionFightLifePointsLostMessage: () => void
  GameActionFightLifeAndShieldPointsLostMessage: () => void
  GameActionFightPointsVariationMessage: () => void
}

export interface GUI extends TypedEmitter<GUIEvents> {
  _resizeUi: () => void
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
    _childrenList: Array<WUIElement>
    getChildren: () => Array<GUIWindow>
  }
  menuBar: {
    _icons: {
      _childrenList: Array<GUIElement>
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
  playerData: {
    id: number
    on: (event: 'characterSelectedSuccess', callback: () => void) => void
    inventory: {
      maxWeight: number
      weight: number
    }
    characters: {
      mainCharacterId: number
      mainCharacter: {
        spellData: {
          spells: Record<number, Spell>
        }
        characteristics: Record<
          keyof CharacterStats,
          {
            getTotalStat: () => number
          }
        >
      }
    }
    characterBaseInformations: {
      id: number
      name: string
      entityLook: unknown
    }
  }
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
