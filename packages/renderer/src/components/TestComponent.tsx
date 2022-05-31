import React from 'react'
import { useStores } from '@lindo/shared'
import { Button } from '@mui/material'

export const TestComponent = () => {
  const stores = useStores()

  return <Button onClick={() => stores.confStore.setAppName('Tst' + Math.random())}>Change app name</Button>
}
