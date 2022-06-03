import { useGameContext } from '@/providers'
import { Game } from '@/store/game-store/game'
import React, { memo, useRef } from 'react'
import { DofusWindow, HTMLIFrameElementWithDofus } from '../types'
import { manageGameWindow } from './manage-game-window'

export interface GameScreenProps {
  game: Game
}

// eslint-disable-next-line react/display-name
export const GameScreen = memo(({ game }: GameScreenProps) => {
  const gameContext = useGameContext()
  const iframeGameRef = useRef<HTMLIFrameElementWithDofus>(null)

  const handleLoad = () => {
    if (iframeGameRef.current) {
      const gameWindow = iframeGameRef.current.contentWindow
      // can't use SQL Database in modern iframe
      gameWindow.openDatabase = undefined
      gameWindow.initDofus(() => {
        console.log('initDofus done')
        manageGameWindow(gameWindow, game)
      })
    }
  }

  console.log('Mount GameScreen ' + game.id)

  return (
    <iframe ref={iframeGameRef} onLoad={handleLoad} style={{ flex: 1, border: 'none' }} src={gameContext.gameSrc} />
  )
})
