import { Game, RootStore } from '@/store'
import { MODS, NotificationsMod } from '@/mods'
import { Mod } from '@/mods/mod'
import { DofusWindow } from '@/dofus-window'
import { TranslationFunctions } from '@lindo/i18n'
import { GameCharacter, SaveCharacterImageArgs } from '@lindo/shared'

export interface ManageGameWindowProps {
  dWindow: DofusWindow
  game: Game
  rootStore: RootStore
  LL: TranslationFunctions
  character?: GameCharacter
}

export const manageGameWindow = ({ dWindow, rootStore, game, LL, character }: ManageGameWindowProps) => {
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

  const handleCharactersListMessage = async () => {
    const characterSelection = dWindow.gui.windowsContainer._childrenList.find((w) => w.id === 'characterSelection')

    if (characterSelection && characterSelection.id === 'characterSelection') {
      if (character) {
        return
      }
      await new Promise((resolve) => setTimeout(resolve, 100))
      const row = characterSelection.charactersTable.content._childrenList.find((c) => c.data?.name === character.name)
      if (row) {
        row.tap()
      } else {
        console.error('Character not found')
      }
      await new Promise<SaveCharacterImageArgs>((resolve, reject) => {
        let i = 0
        const interval = setInterval(() => {
          if (i > 15) {
            reject(new Error('timeout'))
          }
          if (characterSelection.characterDisplay.entity && characterSelection.selectedCharacter) {
            clearInterval(interval)
            const image = characterSelection.characterDisplay.canvas.rootElement.toDataURL('image/png')
            resolve({ image, name: characterSelection.selectedCharacter.name })
          } else {
            console.log('waiting for character display')
          }
          i++
        }, 100)
      })
        .then((args) => {
          window.lindoAPI.saveCharacterImage(args)
        })
        .catch((e) => {
          console.warn('Failed to save character image', e)
        })

      characterSelection.btnPlay.tap()
    }
  }

  dWindow.dofus.connectionManager.on('CharactersListMessage', handleCharactersListMessage)
  dWindow.gui.playerData.on('characterSelectedSuccess', handleCharacterSelectedSuccess)
  dWindow.gui.on('disconnect', handleDisconnect)
}
