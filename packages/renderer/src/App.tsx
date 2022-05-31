import electron from '@/assets/electron.png'
import react from '@/assets/react.svg'
import vite from '@/assets/vite.svg'
import styles from '@/styles/app.module.scss'
import { useEffect, useRef, useState } from 'react'
import { RootStore, RootStoreProvider } from '@lindo/shared'
import { TestComponent } from './components/TestComponent'
import { setupRootStore } from './setup-root-store'

export const App = () => {
  const didSetUpRootStoreRef = useRef(false)
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
      <TestComponent />
    </RootStoreProvider>
  )
}
