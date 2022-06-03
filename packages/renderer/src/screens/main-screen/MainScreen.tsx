import React from 'react'
import { Box, CssBaseline } from '@mui/material'
import { SideBar } from './components/SideBar'
import { Observer } from 'mobx-react-lite'
import { GameScreen } from './GameScreen'
import { useStores } from '@/store'

export const MainScreen = () => {
  const { gameStore } = useStores()
  return (
    <Box sx={{ display: 'flex' }} height='100vh' width='100vw'>
      <CssBaseline />
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
  )
}
