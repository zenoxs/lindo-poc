import { useGameContext } from '@/providers'
import React, { useRef } from 'react'

export const GameScreen = () => {
  const gameContext = useGameContext()
  const iframeGameRef = useRef<HTMLIFrameElement>(null)
  const handleLoad = () => {
    console.log('iframe loaded')
    if (iframeGameRef.current) {
      console.log('ifram ref ok')
      const window = iframeGameRef.current.contentWindow as any
      window.initDofus()
    }
  }

  console.log(gameContext)

  return (
    <iframe
      ref={iframeGameRef}
      style={{ flex: 1, border: 'none' }}
      onLoad={handleLoad}
      src={'file://' + gameContext.gamePath + 'index.html?delayed=true'}
    />
  )
}
