import TypedEmitter from 'typed-emitter'
import { Actor } from '../iso-engine'
import { CharacterStats } from './character-stats'
import { Chat } from './chat'
import { FightManager } from './fight-manager'
import { Scroller } from './scroller'
import { Spell } from './spell'

export interface ChildElement {
  tap: () => void
  id: string
  _contentType: 'wui' | undefined
  _childrenList: Array<ChildElement>
}

export interface ChildWUI extends ChildElement {
  isVisible: () => boolean
  close: () => void
  _childrenList: Array<ChildElement>
  _contentType: 'wui'
}

export interface ChildDialog extends ChildElement {
  isVisible: () => boolean
  close: () => void
  _childrenList: Array<ChildElement>
}

export interface WindowOpenEvent {
  id: string
  tabId: string
  itemData: {
    _type: string
  }
  _messageType: string
}
export type ChildWindowEvents = {
  open: (event: WindowOpenEvent) => void
}
export interface ChildWindow extends ChildElement, TypedEmitter<ChildWindowEvents> {
  id: 'itemRecipes' | 'bidHouseShop' | 'grimoire' | 'social'
}

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
    dialogs: Record<string, ChildDialog>
  }
  windowsContainer: {
    _childrenList: Array<ChildWUI>
    getChildren: () => Array<ChildWindow>
  }
  menuBar: {
    _icons: {
      _childrenList: Array<ChildElement>
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
    isVisible: () => boolean
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
