import { Box, useTheme } from '@mui/material'
import React from 'react'

export const UnlockScreen = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        height: '100vh',
        display: 'flex',
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      Unlock the app
    </Box>
  )
}
