import React from 'react'
import { Box, CssBaseline } from '@mui/material'
import { SideBar } from './components/SideBar'

export const MainScreen = () => {
  return (
    <Box sx={{ display: 'flex' }} height='100vh' width='100vw'>
      <CssBaseline />
      <SideBar />
    </Box>
  )
}
