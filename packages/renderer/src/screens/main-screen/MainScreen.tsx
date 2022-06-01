import React from 'react'
import { TestComponent } from '@/components/TestComponent'
import { Box, CssBaseline, Drawer, Toolbar, List } from '@mui/material'
import { SideBar } from './components/SideBar'

export const MainScreen = () => {
  return (
    <Box sx={{ display: 'flex' }} height='100vh' width='100vw'>
      <CssBaseline />
      <SideBar />
    </Box>
  )
}
