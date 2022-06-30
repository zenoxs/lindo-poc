import { Game, RootStore } from '@/store'
import { MODS } from '@/mods'
import { Mod } from '@/mods/mod'
import { DofusWindow } from '@/dofus-window'

export const manageGameWindow = (dWindow: DofusWindow, game: Game, rootStore: RootStore) => {
  const mods: Array<Mod> = []

  const startMods = () => {
    console.log(MODS)
    for (const key in MODS) {
      const mod: Mod = new MODS[key](dWindow, rootStore)
      mod.start()
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
      mod.close()
    }
  }

  dWindow.gui.playerData.on('characterSelectedSuccess', handleCharacterSelectedSuccess)
  dWindow.gui.on('disconnect', handleDisconnect)
}
