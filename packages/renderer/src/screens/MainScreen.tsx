import React from 'react'
import { TestComponent } from '@/components/TestComponent'
import { Box } from '@mui/material'

export const MainScreen = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <TestComponent />
    </Box>
  )
}
