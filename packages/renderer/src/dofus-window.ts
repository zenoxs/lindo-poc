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

export interface ChildIcon {
  tap: () => void
  id: string
}

export interface ChildWinow {
  id: string
  isVisible: () => boolean
  close: () => void
}

export interface Actor {
  moving: boolean
  canMoveDiagonally: boolean
  cellId: number
  cancelMovement: (callback: () => void) => void
}

export type ConnectionManagerEvents = {
  MapComplementaryInformationsWithCoordsMessage: () => void
  MapComplementaryInformationsDataMessage: () => void
}

export interface ConnectionManager extends TypedEmitter<ConnectionManagerEvents> {}

export interface DofusWindow extends Window {
  initDofus: (callback: () => void) => void
  openDatabase: unknown
  dofus: {
    connectionManager: ConnectionManager
  }
  gui: {
    on: (event: 'disconnect', callback: () => void) => void
    _resizeUi: () => void
    notificationBar: {
      _elementIsVisible: boolean
      currentOpenedId: string
      dialogs: Record<string, unknown>
    }
    windowsContainer: {
      _childrenList: Array<ChildWinow>
    }
    menuBar: {
      _icons: {
        _childrenList: Array<ChildIcon>
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
