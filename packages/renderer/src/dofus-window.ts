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

export interface DofusWindow extends Window {
  initDofus: (callback: () => void) => void
  openDatabase: unknown
  gui: {
    on: (event: 'disconnect', callback: () => void) => void
    _resizeUi: () => void
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
      activate: () => void
    }
  }
  CharacterDisplay: new (props: { scale: 'fitin' }) => CharacterDisplay
}

export interface HTMLIFrameElementWithDofus extends HTMLIFrameElement {
  contentWindow: DofusWindow
}
