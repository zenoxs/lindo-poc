import { Actor, ChatMessage } from '@/dofus-window'
import EventEmitter from 'events'
import { EventManager } from '../helpers'
import { Mod } from '../mod'

export class NotificationsMod extends Mod {
  readonly eventEmitter: EventEmitter = new EventEmitter()
  private readonly _eventManager = new EventManager()

  start(): void {
    this._eventManager.on(this.wGame.dofus.connectionManager, 'ChatServerMessage', (msg) => {
      this.sendMPNotif(msg)
    })

    this._eventManager.on(this.wGame.gui, 'GameFightTurnStartMessage', (actor) => {
      this.sendFightTurnNotif(actor)
    })
  }

  private sendMPNotif(msg: ChatMessage) {
    if (!this.wGame.document.hasFocus() && this.rootStore.optionStore.gameNotification.privateMessage) {
      if (msg.channel === 9) {
        this.eventEmitter.emit('newNotification')

        const mpNotif = new Notification(`Incoming message from ${msg.senderName}`, {
          body: msg.content
        })

        this._handleClickNotification(mpNotif)
      }
    }
  }

  private sendFightTurnNotif(actor: Actor) {
    if (!this.wGame.document.hasFocus() && this.wGame.gui.playerData.characterBaseInformations.id === actor.id) {
      if (this.rootStore.optionStore.gameNotification.fightTurn) {
        this.eventEmitter.emit('newNotification')

        // const turnNotif = new Notification(
        //   this.translate.instant('app.notifications.fight-turn', {
        //     character: this.wGame.gui.playerData.characterBaseInformations.name
        //   })
        // )

        // turnNotif.onclick = () => {
        //   electron.getCurrentWindow().focus()
        //   this.eventEmitter.emit('focusTab')
        // }
      }

      if (this.rootStore.optionStore.gameFight.focusOnFightTurn) {
        // electron.getCurrentWindow().focus()
        // this.eventEmitter.emit('focusTab')
      }
    }
  }

  private _handleClickNotification(notification: Notification) {
    notification.onclick = () => {
      // electron.getCurrentWindow().focus()
      this.eventEmitter.emit('focusTab')
    }
  }

  close() {
    this.eventEmitter.removeAllListeners()
    this._eventManager.close()
  }
}
