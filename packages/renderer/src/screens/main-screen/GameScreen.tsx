import { useGameContext } from '@/providers'
import React from 'react'

export const GameScreen = () => {
  const gameContext = useGameContext()
  const handleLoad = () => {}

  console.log(gameContext)

  return (
    <iframe
      style={{ flex: 1, border: 'none' }}
      onLoad={handleLoad}
      src={'file://' + gameContext.gamePath + 'index.html?delayed=true'}
    />
  )
}
