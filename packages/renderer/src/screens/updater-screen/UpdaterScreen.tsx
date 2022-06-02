import { Box, LinearProgress, useTheme } from '@mui/material'
import React, { useEffect } from 'react'

export const UpdaterScreen = () => {
  const theme = useTheme()
  useEffect(() => {
    document.title = 'Updater'
  }, [])
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        height: '100vh',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <LinearProgress sx={{ margin: 2 }} />
      <Box sx={{ textAlign: 'center' }}>
        <span>Update Information</span>
      </Box>
    </Box>
  )
}
