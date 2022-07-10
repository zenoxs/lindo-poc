import TypedEmitter from 'typed-emitter'

export interface CharacterDisplay {
  setLook: (
    look: unknown,
    props: {
      riderOnly: boolean
      direction: number
      animation: string
      boneType: string
      skinType: string
    }
  ) => void
  rootElement: HTMLElement
}

export type MapDirection = 'left' | 'right' | 'top' | 'bottom'

export enum EffectCategory {
  undefined = -1,
  miscellaneous = 0,
  resistance = 1,
  damage = 2,
  special = 3
}

export interface EffectInstance {
  effect: {
    category: EffectCategory
    characteristic: number
  }
  effectId: number
  min: number
  max: number
}

export interface SpellEffect {
  trigger: boolean
  effectId: number
  diceNum: number
  diceSide: number
  value: number
  description: string
  effect: {
    category: EffectCategory
    characteristic: number
  }
}

export interface SpellBuff {
  source: number
  duration: number
  stack: Array<SpellBuff>
  effect: SpellEffect
  castingSpell: {
    spell: Spell
  }
}
export interface Spell {
  id: number
  isItem: boolean
  spellLevel: {
    effects: Array<SpellEffect>
    criticalEffect: Array<SpellEffect | undefined>
  }
  effectInstances: Record<string, EffectInstance>
  _item: {
    item: {
      criticalHitBonus: number
    }
  }
}

export interface CharacterStats {
  shieldPoints: number
  maxLifePoints: number
  lifePoints: number
  pushDamageFixedResist: number
  waterElementReduction: number
  criticalDamageFixedResist: number
  neutralElementReduction: number
  earthElementReduction: number
  airElementReduction: number
  fireElementReduction: number
  waterElementResistPercent: number
  neutralElementResistPercent: number
  earthElementResistPercent: number
  airElementResistPercent: number
  fireElementResistPercent: number
  waterDamageBonus: number
  neutralDamageBonus: number
  earthDamageBonus: number
  airDamageBonus: number
  fireDamageBonus: number
  damagesBonusPercent: number
  allDamagesBonus: number
  criticalDamageBonus: number
  pushDamageBonus: number
  vitality: number
  healBonus: number
  chance: number
  strength: number
  agility: number
  intelligence: number
}

export interface Fighter {
  id: number
  isCreature: boolean
  buffs: Array<SpellBuff>
  level: number
  data: {
    teamId: number
    alive: boolean
    disposition: {
      cellId: number
    }
    stats: CharacterStats
  }
}

export interface MapCell {
  z: number
  f: number
  l: number
  s: number
}

export type OccupiedCells = {
  [index: number]: Array<{
    actorId: number
  }>
}

export type SlotEvents = {
  doubletap: () => void
}
export interface Slot extends TypedEmitter<SlotEvents> {
  tap: () => void
}

export interface ChildElement {
  tap: () => void
  id: string
  _contentType: 'wui' | undefined
  _childrenList: Array<ChildElement>
}

export interface ChildWUI extends ChildElement {
  id: string
  isVisible: () => boolean
  close: () => void
  _childrenList: Array<ChildElement>
  _contentType: 'wui'
}

export interface ChildDialog extends ChildElement {
  id: string
  isVisible: () => boolean
  close: () => void
  _childrenList: Array<ChildElement>
}

export interface Actor {
  id: number
  moving: boolean
  canMoveDiagonally: boolean
  cellId: number
  cancelMovement: (callback: () => void) => void
}

export interface Guild {
  id: string
  guildName: string
}

export interface ChatMessage {
  channel: number
  senderName: string
  content: string
}

export interface PartyInvitationMessage {
  fromName: string
}
export interface GameRolePlayAggressionMessage {
  defenderId: number
}

export interface TextInformationMessage {
  msgId: number
  parameters: Array<string>
}

export interface TaxMessage {
  guild: Guild
  worldX: number
  worldY: number
  enrichData: {
    subAreaName: string
    firstName: string
    lastName: string
  }
}

export interface ChallengeInfoMessage {
  xpBonus: number
  challengeId: number
}

export type ConnectionManagerEvents = {
  ChallengeInfoMessage: (msg: ChallengeInfoMessage) => void
  GameFightEndMessage: () => void
  MapComplementaryInformationsWithCoordsMessage: () => void
  MapComplementaryInformationsDataMessage: () => void
  ChatServerMessage: (msg: ChatMessage) => void
  TaxCollectorAttackedMessage: (tax: TaxMessage) => void
  GameRolePlayArenaFightPropositionMessage: (e: unknown) => void
  PartyInvitationMessage: (msg: PartyInvitationMessage) => void
  GameRolePlayAggressionMessage: (msg: GameRolePlayAggressionMessage) => void
  TextInformationMessage: (msg: TextInformationMessage) => void
  GameFightTurnStartMessage: () => void
  GameFightTurnEndMessage: () => void
  GameActionFightLifePointsGainMessage: () => void
}

export interface ConnectionManager extends TypedEmitter<ConnectionManagerEvents> {}

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

export interface GUI extends TypedEmitter<GUIEvents> {
  _resizeUi: () => void
  notificationBar: {
    _elementIsVisible: boolean
    currentOpenedId: string
    dialogs: Record<string, ChildDialog>
  }
  windowsContainer: {
    _childrenList: Array<ChildWUI>
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
  fightManager: {
    fightState: number
    isInBattle: () => boolean
    finishTurn: () => void
    getFighters: () => Array<number>
    isFighterOnUsersTeam: (fighterId: number) => boolean
    getFighter: (actorId: number) => Fighter
  }
  timeline: {
    fightControlButtons: {
      toggleReadyForFight: () => void
    }
  }
  chat: {
    active: boolean
    activate: () => void
    deactivate: () => void
  }
}

export interface DofusWindow extends Window {
  initDofus: (callback: () => void) => void
  openDatabase: unknown
  dofus: {
    connectionManager: ConnectionManager
  }
  foreground: {
    rootElement: HTMLDivElement
  }
  gui: GUI
  isoEngine: {
    _castSpellImmediately: (cellId: number) => void
    mapScene: {
      convertSceneToCanvasCoordinate: (
        x: number,
        y: number
      ) => {
        x: number
        y: number
      }
    }
    gotoNeighbourMap: (direction: MapDirection, cell: number, x: number, y: number) => void
    mapRenderer: {
      isFightMode: boolean
      mapId: number
      isWalkable: (cell: number) => boolean
      getChangeMapFlags: (cell: number) => Record<MapDirection, boolean>
      getCellSceneCoordinate: (cell: number) => {
        x: number
        y: number
      }
      map: {
        cells: MapCell[]
      }
      grid: {
        getCoordinateGridFromCellId: (cellId: number) => {
          i: number // x
          j: number // y
        }
      }
    }
    actorManager: {
      getActor: (userId: number) => Actor
      userId: number
      userActor: Actor
      _occupiedCells: OccupiedCells
    }
  }
  CharacterDisplay: new (props: { scale: 'fitin' }) => CharacterDisplay
}

export interface HTMLIFrameElementWithDofus extends HTMLIFrameElement {
  contentWindow: DofusWindow
}
