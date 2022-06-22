import { RootStore } from '@/store'
import { forEachOf } from 'async'
import { Shortcuts } from 'shortcuts'
import { Mod } from '../mod'
// import { Mover } from './mover'

export class ShortcutsMod extends Mod {
  private readonly _shortcuts = new Shortcuts({ target: this.wGame })
  // private mover: Mover

  startMod(): void {
    // if (this.params.diver.active_open_menu) {
    //   Logger.info('- enable Open_menu')
    // }
    // this.mover = new Mover(this.wGame, this.settings, this.translate)
    this.bindAll()
  }

  private bindAll() {
    console.info('bindAll')
    const gameActionHotkey = this.rootStore.hotkeyStore.gameAction

    // End turn
    if (gameActionHotkey.endTurn)
      this._shortcuts.add([
        {
          shortcut: gameActionHotkey.endTurn,
          handler: () => {
            if (this.wGame.gui.fightManager.fightState === 0) {
              this.wGame.gui.timeline.fightControlButtons.toggleReadyForFight()
            } else if (this.wGame.gui.fightManager.fightState === 1) {
              this.wGame.gui.fightManager.finishTurn()
            }
          }
        }
      ])

    // go to top map
    if (gameActionHotkey.goUp)
      this._shortcuts.add([
        {
          shortcut: gameActionHotkey.goUp,
          handler: () => {
            // this.mover.move(
            //   'top',
            //   () => {
            //     console.debug('Move to Up OK')
            //   },
            //   (reason: string = '') => {
            //     console.debug('Move to Up Failed... (' + reason + ')')
            //   }
            // )
          }
        }
      ])

    // go to bottom map
    if (gameActionHotkey.goDown)
      this._shortcuts.add([
        {
          shortcut: gameActionHotkey.goUp,
          handler: () => {
            console.log('go up')
            // this.mover.move(
            //   'bottom',
            //   () => {
            //     console.debug('Move to Bottom OK')
            //   },
            //   (reason: string = '') => {
            //     console.debug('Move to Bottom Failed... (' + reason + ')')
            //   }
            // )
          }
        }
      ])

    if (gameActionHotkey.goLeft)
      this._shortcuts.add([
        {
          shortcut: gameActionHotkey.goLeft,
          handler: () => {
            // this.mover.move(
            //   'left',
            //   () => {
            //     console.debug('Move to Left OK')
            //   },
            //   (reason: string = '') => {
            //     console.debug('Move to Left Failed... (' + reason + ')')
            //   }
            // )
          }
        }
      ])

    if (gameActionHotkey.goRight)
      this._shortcuts.add([
        {
          shortcut: gameActionHotkey.goRight,
          handler: () => {
            // this.mover.move(
            //   'right',
            //   () => {
            //     console.debug('Move to Right OK')
            //   },
            //   (reason: string = '') => {
            //     console.debug('Move to Right Failed... (' + reason + ')')
            //   }
            // )
          }
        }
      ])

    // Open chat
    if (gameActionHotkey.openChat)
      this._shortcuts.add([
        {
          shortcut: gameActionHotkey.openChat,
          handler: () => {
            if (!this.wGame.gui.numberInputPad.isVisible()) {
              this.wGame.gui.chat.activate()
            }
          }
        }
      ])

    // Open menu
    if (gameActionHotkey.openMenu)
      this._shortcuts.add([
        {
          shortcut: gameActionHotkey.openMenu,
          handler: () => {
            this.wGame.gui.mainControls.buttonBox._childrenList[15].tap()
          }
        }
      ])

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

    console.log(this._shortcuts)
  }

  public reset() {
    super.reset()
    this._shortcuts.reset()
    // if (this.mover) {
    //   this.mover.reset()
    // }
    // this.shortcutsHelper.unBindAll()
  }
}
