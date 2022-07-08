import { ConnectionManagerEvents } from '@/dofus-window'
import { EventManager } from '../helpers'
import { Mod } from '../mod'

export class ChallPercentMod extends Mod {
  private stylesheet?: HTMLStyleElement
  private eventManager = new EventManager()

  start(): void {
    if (this.rootStore.optionStore.gameFight.challengeBonus) {
      console.info('- enable ChallPercent')
      this.stylesheet = window.document.createElement('style')
      this.stylesheet.id = 'ChallPercent'
      this.stylesheet.innerHTML = `
      .challPercentOnIcon .challengeIcon {
        background-size: contain;
        background-position: left center;
      }

      .challPercentOnIcon,
      .challPercentOnIcon .challengeSlot {
        width: 100px;
      }

      .challPercentOnIconDetails {
        position: absolute;
        width: 45px;
        left: 45px;
        top: 11px;
      }
      `

      this.wGame.document.head.appendChild(this.stylesheet)

      this.wGame.gui.challengeIndicator.rootElement.classList.add('challPercentOnIcon')

      this.eventManager.on<ConnectionManagerEvents, 'ChallengeInfoMessage'>(
        this.wGame.dofus.connectionManager,
        'ChallengeInfoMessage',
        (msg) => {
          const challengeText = document.createElement('div')
          challengeText.className = 'challPercentOnIconDetails'
          challengeText.innerHTML = '+' + msg.xpBonus + '%'
          this.wGame.gui.challengeIndicator?.iconDetailsListByChallengeId?.[
            msg.challengeId
          ]?.icon?.rootElement.appendChild(challengeText)
        }
      )
    }
  }

  public close() {
    this.stylesheet?.remove?.()

    if (this.wGame.gui.challengeIndicator) {
      this.wGame.gui?.challengeIndicator?.rootElement?.classList?.remove?.('challPercentOnIcon')
    }
  }
}
