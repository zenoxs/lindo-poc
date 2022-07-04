import { HTMLIFrameElementWithDofus } from '@/dofus-window'
import { useGameContext } from '@/providers'
import { useStores } from '@/store'
import { Game } from '@/store/game-store/game'
import React, { memo, useRef } from 'react'
import { manageGameWindow } from './manage-game-window'

export interface GameScreenProps {
  game: Game
}

// eslint-disable-next-line react/display-name
export const GameScreen = memo(({ game }: GameScreenProps) => {
  const gameContext = useGameContext()
  const rootStore = useStores()
  const iframeGameRef = useRef<HTMLIFrameElementWithDofus>(null)

  const handleLoad = () => {
    if (iframeGameRef.current) {
      const gameWindow = iframeGameRef.current.contentWindow
      console.log(gameWindow)
      // can't use SQL Database in modern iframe
      gameWindow.openDatabase = undefined
      gameWindow.initDofus(() => {
        console.log('initDofus done')
        manageGameWindow(gameWindow, game, rootStore)
      })
    }
  }

  console.log('Mount GameScreen ' + game.id)

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
