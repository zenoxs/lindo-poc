import { useGameContext } from '@/providers'
import { Game } from '@/store/game-store/game'
import React, { memo, useMemo, useRef } from 'react'
import { HTMLIFrameElementWithDofus } from './types'

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
      })
    }
  }

  console.log('Mount GameScreen ' + game.id)

  return (
    <iframe ref={iframeGameRef} onLoad={handleLoad} style={{ flex: 1, border: 'none' }} src={gameContext.gameSrc} />
  )
})
