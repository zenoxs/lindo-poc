import React from 'react'
import { MainScreen, UpdaterScreen } from '@/screens'
import { Route, Routes } from 'react-router-dom'

export const Navigator = () => {
  return (
    <Routes>
      <Route path='/' element={<MainScreen />} />
      <Route path='updater' element={<UpdaterScreen />} />
    </Routes>
  )
}
