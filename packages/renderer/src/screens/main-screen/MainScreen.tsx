import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { SideBar } from './side-bar/SideBar'
import { Observer } from 'mobx-react-lite'
import { GameScreen } from './game-screen/GameScreen'
import { useStores } from '@/store'
import { TabManager } from './tab-manager'

export const MainScreen = () => {
  const { gameStore } = useStores()
  useEffect(() => {
    window.titleBar.updateTitle('Test 3')
  }, [])

  return (
    <TabManager>
      <Box sx={{ display: 'flex', flex: 1 }} height='100%' width='100vw'>
        <SideBar />
        <Observer>
          {() => (
            <>
              {gameStore.gameList.map((game) => (
                <div
                  style={{
                    flex: 1,
                    display: gameStore.selectedGame?.id !== game.id ? 'none' : 'flex'
                  }}
                  key={game.id}
                >
                  <GameScreen key={game.id} game={game} />
                </div>
              ))}
            </>
          )}
        </Observer>
      </Box>
    </TabManager>
  )
}
