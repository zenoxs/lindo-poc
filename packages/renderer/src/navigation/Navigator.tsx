import React from 'react'
import { MainScreen, OptionScreen, UpdaterScreen } from '@/screens'
import { Route, Routes } from 'react-router-dom'
import { TitleBar } from './TitleBar'
import { Box } from '@mui/material'

export const Navigator = () => {
  return (
    <>
      <TitleBar />
      <Box sx={{ display: 'flex', height: 'calc(100vh - 25px)' }}>
        <Routes>
          <Route path='/' element={<MainScreen />} />
          <Route path='updater' element={<UpdaterScreen />} />
          <Route path='option' element={<OptionScreen />} />
        </Routes>
      </Box>
    </>
  )
}
