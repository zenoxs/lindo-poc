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
  id: string
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

export type ConnectionManagerEvents = {
  MapComplementaryInformationsWithCoordsMessage: () => void
  MapComplementaryInformationsDataMessage: () => void
  ChatServerMessage: (msg: ChatMessage) => void
  TaxCollectorAttackedMessage: (tax: TaxMessage) => void
}

export interface ConnectionManager extends TypedEmitter<ConnectionManagerEvents> {}

export type GUIEvents = {
  disconnect: () => void
  GameFightTurnStartMessage: (actor: Actor) => void
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
    on: (event: 'characterSelectedSuccess', callback: () => void) => void
    characterBaseInformations: {
      id: string
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
    finishTurn: () => void
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
