import { useGameContext } from '@/providers'
import React, { useRef } from 'react'

interface DofusIframeWindow extends Window {
  initDofus: (callback: () => void) => void
  openDatabase: unknown
}

interface HTMLIFrameElementWithDofus extends HTMLIFrameElement {
  contentWindow: DofusIframeWindow
}

export const GameScreen = () => {
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

  return (
    <iframe ref={iframeGameRef} onLoad={handleLoad} style={{ flex: 1, border: 'none' }} src={gameContext.gameSrc} />
  )
}
