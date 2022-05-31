import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { useEffect, useRef, useState } from 'react'
import { RootStore, RootStoreProvider } from '@lindo/shared'
import { setupRootStore } from './setup-root-store'
import { MainScreen } from './screens/MainScreen'

export const App = () => {
  const didSetUpRootStoreRef = useRef(false)
  const mdTheme = createTheme()
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  useEffect(() => {
    // prevents to setup root store multiple times
    // cf. React 18 https://github.com/reactwg/react-18/discussions/18
    if (didSetUpRootStoreRef.current === false) {
      didSetUpRootStoreRef.current = true
      setupRootStore().then(setRootStore)
    }
  }, [])

  if (!rootStore) return null

  return (
    <RootStoreProvider value={rootStore}>
      <ThemeProvider theme={mdTheme}>
        <MainScreen />
      </ThemeProvider>
    </RootStoreProvider>
  )
}
