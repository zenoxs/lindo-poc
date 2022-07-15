import { HTMLIFrameElementWithDofus } from '@/dofus-window'
import { useGameContext } from '@/providers'
import { useStores } from '@/store'
import { Game } from '@/store/game-store/game'
import { useI18nContext } from '@lindo/i18n'
import { reaction } from 'mobx'
import React, { memo, useEffect, useRef } from 'react'
import { useGameManager } from './use-game-manager'

export interface GameScreenProps {
  game: Game
}

// eslint-disable-next-line react/display-name
export const GameScreen = memo(({ game }: GameScreenProps) => {
  const gameContext = useGameContext()
  const rootStore = useStores()
  const { LL } = useI18nContext()
  const gameManager = useGameManager({
    game,
    rootStore,
    LL
  })
  const iframeGameRef = useRef<HTMLIFrameElementWithDofus>(null)

  useEffect(() => {
    return reaction(
      () => rootStore.gameStore.selectedGame,
      (selectedGame) => {
        if (selectedGame?.id === game.id) {
          console.log('force focus')
          setTimeout(() => {
            iframeGameRef.current?.focus()
          }, 100)
        }
      },
      { fireImmediately: true }
    )
  })

  const handleLoad = () => {
    if (iframeGameRef.current) {
      const gameWindow = iframeGameRef.current.contentWindow
      // can't use SQL Database in modern iframe
      gameWindow.openDatabase = undefined
      gameWindow.initDofus(() => {
        console.log('initDofus done')
        gameManager.init(gameWindow)
      })
    }
  }

  return (
    <iframe
      id={`iframe-game-${game.id}`}
      ref={iframeGameRef}
      onLoad={handleLoad}
      style={{ flex: 1, border: 'none' }}
      src={gameContext.gameSrc}
    />
  )
})
