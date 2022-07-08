import { Game, RootStore } from '@/store'
import { MODS, NotificationsMod } from '@/mods'
import { Mod } from '@/mods/mod'
import { DofusWindow } from '@/dofus-window'
import { TranslationFunctions } from '@lindo/i18n'

export interface ManageGameWindowProps {
  dWindow: DofusWindow
  game: Game
  rootStore: RootStore
  LL: TranslationFunctions
}

export const manageGameWindow = ({ dWindow, rootStore, game, LL }: ManageGameWindowProps) => {
  const mods: Array<Mod> = []

  const startMods = () => {
    console.log(dWindow)
    for (const key in MODS) {
      const mod: Mod = new MODS[key](dWindow, rootStore, LL)
      if (mod instanceof NotificationsMod) {
        mod.eventEmitter.on('notification', () => {
          game.setHasNotification(true)
        })
        mod.eventEmitter.on('focusTabRequest', () => {
          rootStore.gameStore.selectGame(game)
        })
      }
      mods.push(mod)
    }
  }

  dWindow.onresize = () => {
    try {
      dWindow.gui._resizeUi()
    } catch (e) {}
  }

  const handleCharacterSelectedSuccess = () => {
    game.setCharacterName(dWindow.gui.playerData.characterBaseInformations.name)

    /* create icon */
    const char = new dWindow.CharacterDisplay({ scale: 'fitin' })
    char.setLook(dWindow.gui.playerData.characterBaseInformations.entityLook, {
      riderOnly: true,
      direction: 4,
      animation: 'AnimArtwork',
      boneType: 'timeline/',
      skinType: 'timeline/'
    })
    char.rootElement.style.width = '100%'
    char.rootElement.style.height = '100%'

    game.setCharacterIcon(char.rootElement)
    startMods()
  }

  const handleDisconnect = () => {
    game.disconnected()
    for (const mod of mods) {
      mod.destroy()
    }
  }

  dWindow.gui.playerData.on('characterSelectedSuccess', handleCharacterSelectedSuccess)
  dWindow.gui.on('disconnect', handleDisconnect)
}
