import React from 'react'
import { MainScreen, OptionScreen, UpdaterScreen } from '@/screens'
import { Route, Routes } from 'react-router-dom'

export const Navigator = () => {
  return (
    <Routes>
      <Route path='/' element={<MainScreen />} />
      <Route path='updater' element={<UpdaterScreen />} />
      <Route path='option' element={<OptionScreen />} />
    </Routes>
  )
}
