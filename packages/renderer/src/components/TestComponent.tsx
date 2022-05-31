import React from 'react'
import { useStores } from '@lindo/shared'

export const TestComponent = () => {
  const stores = useStores()

  return <button onClick={() => stores.confStore.setAppName('Tst' + Math.random())}>Change app name</button>
}
