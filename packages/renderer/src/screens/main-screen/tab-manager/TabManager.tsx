import { useConst } from '@/hooks'
import { useStores } from '@/store'
import { observe } from 'mobx'
import React, { useEffect } from 'react'
import { Shortcuts } from 'shortcuts'
export interface TabManagerProps {
  children: React.ReactNode
}

/**
 * Manage hotkeys and action for game tabs
 **/
export const TabManager = ({ children }: TabManagerProps) => {
  const { gameStore, hotkeyStore } = useStores()
  const shortcuts = useConst(new Shortcuts())

  useEffect(
    () =>
      window.subscribeToNewTab(() => {
        gameStore.addGame()
      }),
    []
  )

  useEffect(
    () =>
      window.subscribeToNextTab(() => {
        gameStore.selectNextGame()
      }),
    []
  )

  useEffect(
    () =>
      window.subscribeToPrevTab(() => {
        gameStore.selectPreviousGame()
      }),
    []
  )

  useEffect(
    () =>
      window.subscribeToCloseTab(() => {
        gameStore.removeSelectedGame()
      }),
    []
  )

  useEffect(() => {
    const setTabHotKeys = () => {
      shortcuts.reset()
      shortcuts.add(
        hotkeyStore.window.tabs.map((tab, index) => ({
          shortcut: tab,
          handler: (event) => {
            console.log(event)
            gameStore.selectGameIndex(index)
          }
        }))
      )
    }
    setTabHotKeys()
    return observe(hotkeyStore.window.tabs, (change) => {
      console.log(change)
      setTabHotKeys()
    })
  }, [hotkeyStore.window.tabs])

  return <>{children}</>
}
