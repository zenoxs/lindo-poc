import React, { useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, Stack, DialogActions, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { PasswordElement, PasswordRepeatElement } from 'react-hook-form-mui'

interface ChangePasswordForm {
  old_password: string
  password: string
  password_repeat: string
}

export interface ChangePasswordDialogProps {
  onClose: () => void
  open: boolean
}

export const ChangePasswordDialog = ({ open, onClose }: ChangePasswordDialogProps) => {
  // const { LL } = useI18nContext()
  const { control, handleSubmit, reset, setError } = useForm<ChangePasswordForm>()

  const onSubmit = async (data: ChangePasswordForm) => {
    const result = await window.lindoAPI.changeMasterPassword(data.password, data.old_password)
    if (!result) {
      setError('old_password', { message: 'Invalid password' }, { shouldFocus: true })
    } else {
      onClose()
    }
  }

  useEffect(() => {
    reset()
  }, [open])

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Configure master password</DialogTitle>
      <DialogContent>
        <Stack
          id='configure-password-form'
          spacing={2}
          sx={{ mt: 2 }}
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit(onSubmit)}
        >
          <PasswordElement name='old_password' control={control} required fullWidth label={'Old Password'} />
          <PasswordElement name='password' control={control} required fullWidth label={'Password'} />
          <PasswordRepeatElement
            name='password_repeat'
            passwordFieldName='password'
            control={control}
            fullWidth
            label={'Confirm'}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant='outlined' type='submit' form='configure-password-form'>
          Validate
        </Button>
      </DialogActions>
    </Dialog>
  )
}
