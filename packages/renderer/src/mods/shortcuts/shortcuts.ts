import { DofusWindow } from '@/dofus-window'
import { RootStore } from '@/store'
import { IReactionDisposer, reaction } from 'mobx'
import { Shortcuts } from 'shortcuts'
import { Mod } from '../mod'
import { Mover } from './mover'

export class ShortcutsMod extends Mod {
  private readonly _disposers: Array<IReactionDisposer> = []
  private readonly _shortcuts = new Shortcuts({ target: this.wGame.document })
  private readonly _mover: Mover

  constructor(wGame: DofusWindow, rootStore: RootStore) {
    super(wGame, rootStore)
    this._mover = new Mover(wGame)
  }

  start(): void {
    this._bindAll()
  }

  private _addShortcut(shortcutProp: string, handler: (event: KeyboardEvent) => boolean | void) {
    const addShortcut = (shortcut: string) => {
      if (shortcut !== '') {
        this._shortcuts.add({ shortcut, handler })
      }
    }
    const disposer = reaction(
      () => shortcutProp,
      (shortcut, previousShortcut) => {
        if (shortcut === '') {
          this._shortcuts.remove({ shortcut: previousShortcut, handler })
          addShortcut(shortcut)
        } else {
          this._shortcuts.remove({ shortcut: previousShortcut, handler })
        }
      }
    )
    this._disposers.push(disposer)
    addShortcut(shortcutProp)
  }

  private _bindAll() {
    console.info('bindAll')
    const gameActionHotkey = this.rootStore.hotkeyStore.gameAction

    // End turn
    this._addShortcut(gameActionHotkey.endTurn, () => {
      if (this.wGame.gui.fightManager.fightState === 0) {
        this.wGame.gui.timeline.fightControlButtons.toggleReadyForFight()
      } else if (this.wGame.gui.fightManager.fightState === 1) {
        this.wGame.gui.fightManager.finishTurn()
      }
    })

    // go to top map
    this._addShortcut(gameActionHotkey.goUp, () => {
      this._mover.move(
        'top',
        () => {
          console.debug('Move to Up OK')
        },
        (reason: string = '') => {
          console.debug('Move to Up Failed... (' + reason + ')')
        }
      )
    })

    // go to bottom map
    this._addShortcut(gameActionHotkey.goDown, () => {
      this._mover.move(
        'bottom',
        () => {
          console.debug('Move to Bottom OK')
        },
        (reason: string = '') => {
          console.debug('Move to Bottom Failed... (' + reason + ')')
        }
      )
    })

    this._addShortcut(gameActionHotkey.goLeft, () => {
      this._mover.move(
        'left',
        () => {
          console.debug('Move to Left OK')
        },
        (reason: string = '') => {
          console.debug('Move to Left Failed... (' + reason + ')')
        }
      )
    })

    this._addShortcut(gameActionHotkey.goRight, () => {
      this._mover.move(
        'right',
        () => {
          console.debug('Move to Right OK')
        },
        (reason: string = '') => {
          console.debug('Move to Right Failed... (' + reason + ')')
        }
      )
    })

    // Open chat
    this._addShortcut(gameActionHotkey.openChat, () => {
      if (!this.wGame.gui.numberInputPad.isVisible()) {
        this.wGame.gui.chat.activate()
      }
    })

    // Open menu
    this._addShortcut(gameActionHotkey.openMenu, () => {
      this.wGame.gui.mainControls.buttonBox._childrenList[15].tap()
    })

    // // Spell
    // void forEachOf(this.params.spell, (shortcut: string, index: number) => {
    //   const selectedSpell = this.wGame.gui.shortcutBar._panels.spell.slotList[index]

    //   this.shortcutsHelper.bind(shortcut, () => {
    //     selectedSpell.tap()
    //     // this.tab.window.gui.shortcutBar.panels.spell.slotList[index].tap();
    //   })
    //   selectedSpell.on('doubletap', () => {
    //     /* TODO (HoPollo) :
    //           / Allow double shortcut tap to work as well (currently only mouseclick works)
    //           */
    //     if (this.wGame.gui.fightManager.fightState === 0) {
    //       return
    //     }

    //     selectedSpell.tap()

    //     setTimeout(() => {
    //       this.wGame.isoEngine._castSpellImmediately(this.wGame.isoEngine.actorManager.userActor.cellId)
    //     }, 150)
    //   })
    // })

    // // Item
    // void forEachOf(this.params.item, (shortcut: string, index: number) => {
    //   this.shortcutsHelper.bind(shortcut, () => {
    //     // this.tab.window.gui.shortcutBar.panels.item.slotList[index].tap();
    //     this.wGame.gui.shortcutBar._panels.item.slotList[index].tap()
    //   })
    // })

    // // Interfaces
    // void forEachOf(this.params.interface.getAll(), (inter: any) => {
    //   this.wGame.gui.menuBar._icons._childrenList.forEach((element: any, index: number) => {
    //     if (element.id.toUpperCase() == inter.key.toUpperCase()) {
    //       this.shortcutsHelper.bind(inter.value, () => {
    //         this.wGame.gui.menuBar._icons._childrenList[index].tap()
    //       })
    //     }
    //   })
    // })

    // // Close interfaces
    // this.shortcutsHelper.bindVanilla('escape', () => {
    //   if (this.wGame.gui.chat.active) {
    //     this.wGame.gui.chat.deactivate()
    //   } else {
    //     let winClosed = 0
    //     for (let i = this.wGame.gui.windowsContainer._childrenList.length - 1; i >= 0; i--) {
    //       const win = this.wGame.gui.windowsContainer._childrenList[i]
    //       if (win.isVisible() && win.id !== 'recaptcha') {
    //         win.close()
    //         winClosed++
    //         break
    //       }
    //     }
    //     if (this.wGame.gui.notificationBar._elementIsVisible) {
    //       const dialogName = this.wGame.gui.notificationBar.currentOpenedId
    //       // If notifiaction is openened, allow to close it with ESC
    //       this.wGame.gui.notificationBar.dialogs[dialogName]._childrenList[0]._childrenList[1].tap()
    //       winClosed++
    //     }
    //     if (this.params.diver.active_open_menu && !winClosed) {
    //       // If no window closed open menu
    //       this.wGame.gui.mainControls.buttonBox._childrenList[15].tap()
    //     }
    //   }
    // })
    // // Prevent using tab key
    // this.shortcutsHelper.bindVanilla('tab', (e: KeyboardEvent) => {
    //   e.preventDefault()
    // })
  }

  close() {
    this._shortcuts.reset()
    for (const disposer of this._disposers) {
      disposer()
    }
    this._mover.close()
  }
}
