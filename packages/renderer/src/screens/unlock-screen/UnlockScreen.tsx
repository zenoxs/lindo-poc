import { Box, Button, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { PasswordElement } from 'react-hook-form-mui'
import { useNavigate } from 'react-router-dom'

export const UnlockScreen = () => {
  const theme = useTheme()
  const { control, handleSubmit, setError } = useForm<{ password: string }>()
  const navigate = useNavigate()

  const onSubmit = async (data: { password: string }) => {
    const result = await window.lindoAPI.unlockApplication(data.password)
    if (!result) {
      setError('password', { message: 'Invalid password' }, { shouldFocus: true })
    } else {
      navigate('/choose-team')
    }
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        backgroundColor: theme.palette.background.default,
        height: '100vh',
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
      noValidate
      autoComplete='off'
    >
      <Box sx={{ maxWidth: '40ch' }}>
        <Typography>Enter your master password to connect your dofus touch accounts automatically</Typography>
        <PasswordElement
          fullWidth
          required
          sx={{ mt: 2 }}
          name='password'
          label={'Master Password'}
          control={control}
        />
        <Stack sx={{ mt: 2 }} alignSelf={'stretch'} direction='row' justifyContent='space-between'>
          <Button>Skip</Button>
          <Button variant='contained' type='submit'>
            Unlock
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}
