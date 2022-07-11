import {
  ConnectionManagerEvents,
  DofusWindow,
  ExchangeStartOkHumanVendorMessage,
  GameRolePlayShowActorMessage,
  MapComplementaryInformationsDataMessage
} from '@/dofus-window'
import { RootStore } from '@/store'
import { TranslationFunctions } from '@lindo/i18n'
import { EventManager } from '../helpers'
import { Mod } from '../mod'

interface TabData {
  id: number
  position: number
}

export class MerchantMod extends Mod {
  private eventManager = new EventManager()
  private tab: Array<TabData> = []
  private clickDisposer: () => void
  private numMM?: number

  constructor(wGame: DofusWindow, rootStore: RootStore, LL: TranslationFunctions) {
    super(wGame, rootStore, LL)
    this.eventManager.on<ConnectionManagerEvents, 'MapComplementaryInformationsDataMessage'>(
      this.wGame.dofus.connectionManager,
      'MapComplementaryInformationsDataMessage',
      (response) => this.getMM(response)
    )
    this.eventManager.on<ConnectionManagerEvents, 'ExchangeStartOkHumanVendorMessage'>(
      this.wGame.dofus.connectionManager,
      'ExchangeStartOkHumanVendorMessage',
      (response) => this.openMM(response)
    )
    this.eventManager.on<ConnectionManagerEvents, 'ExchangeLeaveMessage'>(
      this.wGame.dofus.connectionManager,
      'ExchangeLeaveMessage',
      () => this.closeW()
    )
    this.eventManager.on<ConnectionManagerEvents, 'ExchangeLeaveMessage'>(
      this.wGame.dofus.connectionManager,
      'ExchangeLeaveMessage',
      () => this.closeW()
    )

    this.eventManager.on<ConnectionManagerEvents, 'GameRolePlayShowActorMessage'>(
      this.wGame.dofus.connectionManager,
      'GameRolePlayShowActorMessage',
      (response) => this.showActor(response)
    )

    const clickerListener = (event: MouseEvent) => this.clickB(event)
    this.wGame.document.addEventListener('click', clickerListener)
    this.clickDisposer = () => this.wGame.document.removeEventListener('click', clickerListener)
  }

  private showActor(response: GameRolePlayShowActorMessage): void {
    if (response.informations._type === 'GameRolePlayMerchantInformations') {
      this.tab = []
      this.numMM = undefined
      for (const i in this.wGame.actorManager.actors) {
        if (this.wGame.actorManager.actors[i].isMerchant()) {
          this.tab.push({ id: parseFloat(i), position: this.wGame.actorManager.actors[i].cellId })
        }
      }
    }
  }

  private clickB(event: MouseEvent): void {
    const target = event.target as HTMLElement | null
    const parentNode = target?.parentNode as HTMLDivElement | undefined
    if (parentNode?.id === 'rightMM') {
      this.clickRight()
      this.closeW()
    } else if (parentNode?.id === 'leftMM') {
      this.clickLeft()
      this.closeW()
    }
  }

  private getMM(response: MapComplementaryInformationsDataMessage): void {
    this.tab = []
    for (const i in response.actors) {
      if (response.actors[i]._type === 'GameRolePlayMerchantInformations') {
        this.tab.push({ id: response.actors[i].contextualId, position: response.actors[i].disposition.cellId })
      }
    }
  }

  private addBtn(): void {
    const leftDiv = document.createElement('div')
    leftDiv.className = 'filter Button scaleOnPress'
    leftDiv.id = 'leftMM'
    const leftIcon = document.createElement('div')
    leftIcon.className = 'icon'
    leftIcon.style.backgroundImage = 'url(../game/assets/ui/borderArrow/left.png)'
    leftIcon.style.backgroundSize = '80%'
    leftIcon.style.backgroundPosition = '50% 35%'
    leftDiv.appendChild(leftIcon)
    this.wGame.document
      .getElementsByClassName('window TradeStorageWindow buy-human')[0]
      .getElementsByClassName('filter')[0]
      .parentNode?.insertBefore(
        leftDiv,
        this.wGame.document
          .getElementsByClassName('window TradeStorageWindow buy-human')[0]
          .getElementsByClassName('filter')[0]
      )

    const rightDiv = document.createElement('div')
    rightDiv.className = 'filter Button scaleOnPress'
    rightDiv.id = 'rightMM'
    const rightIcon = document.createElement('div')
    rightIcon.className = 'icon'
    rightIcon.style.backgroundImage = 'url(../game/assets/ui/borderArrow/right.png)'
    rightIcon.style.backgroundSize = '80%'
    rightIcon.style.backgroundPosition = '50% 35%'
    rightDiv.appendChild(rightIcon)
    this.wGame.document
      .getElementsByClassName('window TradeStorageWindow buy-human')[0]
      .getElementsByClassName('filter')[0]
      .parentNode?.insertBefore(rightDiv, null)
  }

  private openMM(response: ExchangeStartOkHumanVendorMessage): void {
    this.closeW()
    this.addBtn()
    this.numMM = this.tab.findIndex((i) => i.id === response.sellerId)
  }

  private clickLeft(): void {
    if (this.wGame.document.getElementById('leftMM')) {
      this.closeMM()
      if (this.numMM === this.tab.length - 1) {
        this.numMM = -1
      }
      this.wGame.dofus.sendMessage('ExchangeOnHumanVendorRequestMessage', {
        humanVendorId: this.tab[this.numMM! + 1].id,
        humanVendorCell: this.tab[this.numMM! + 1].position
      })
    }
  }

  private clickRight(): void {
    if (this.wGame.document.getElementById('rightMM')) {
      this.closeMM()
      if (this.numMM === 0) {
        this.numMM = this.tab.length
      }
      this.wGame.dofus.sendMessage('ExchangeOnHumanVendorRequestMessage', {
        humanVendorId: this.tab[this.numMM! - 1].id,
        humanVendorCell: this.tab[this.numMM! - 1].position
      })
    }
  }

  private closeMM(): void {
    this.wGame.dofus.sendMessage('LeaveDialogRequestMessage', null)
  }

  private closeW(): void {
    this.wGame.document.querySelectorAll('#leftMM').forEach((elem) => elem.remove())
    this.wGame.document.querySelectorAll('#rightMM').forEach((elem) => elem.remove())
  }

  destroy(): void {
    this.eventManager.close()
    this.clickDisposer()
  }
}
