import { Game } from '@/store'
import { DofusWindow } from '../types'

export const manageGameWindow = (dWindow: DofusWindow, game: Game) => {
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
  }

  const handleDisconnect = () => {
    game.disconnected()
  }

  dWindow.gui.playerData.on('characterSelectedSuccess', handleCharacterSelectedSuccess)
  dWindow.gui.on('disconnect', handleDisconnect)
}
