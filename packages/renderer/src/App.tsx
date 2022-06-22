import { ThemeProvider } from '@mui/material/styles'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { setupRootStore, RootStore, RootStoreProvider } from './store'
import { Navigator } from './navigation'
import { GameContextProvider } from './providers'
import { GameContext } from '@lindo/shared'
import { CssBaseline, useMediaQuery } from '@mui/material'
import { darkTheme, lightTheme } from './themes'

export const App = () => {
  const didSetUpRootStoreRef = useRef(false)
  const didSetUpGameContextRef = useRef(false)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  const [gameContext, setGameContext] = useState<GameContext | undefined>(undefined)

  // TODO: fix lightTheme
  // const theme = useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode])
  const theme = darkTheme

  useEffect(() => {
    // prevents to setup root store multiple times
    // cf. React 18 https://github.com/reactwg/react-18/discussions/18
    if (didSetUpRootStoreRef.current === false) {
      didSetUpRootStoreRef.current = true
      setupRootStore().then((rootStore) => {
        window.appVersion = rootStore.appStore.appVersion
        window.buildVersion = rootStore.appStore.buildVersion
        window.lindoVersion = rootStore.appStore.lindoVersion
        setRootStore(rootStore)
      })
    }
    if (didSetUpGameContextRef.current === false) {
      didSetUpGameContextRef.current = true
      window.fetchGameContext().then(setGameContext)
    }
  }, [])

  if (!rootStore || !gameContext) return null

  return (
    <RootStoreProvider value={rootStore}>
      <GameContextProvider value={gameContext}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navigator />
        </ThemeProvider>
      </GameContextProvider>
    </RootStoreProvider>
  )
}
