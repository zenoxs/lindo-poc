import React from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material'
import { PasswordElement, PasswordRepeatElement } from 'react-hook-form-mui'
import { useForm } from 'react-hook-form'
import { Observer } from 'mobx-react-lite'
import { useI18nContext } from '@lindo/i18n'

interface PasswordForm {
  password: string
  password_repeat: string
}

export const OptionMultiAccount = () => {
  const { LL } = useI18nContext()
  const { control, handleSubmit } = useForm<PasswordForm>()
  const [openConfigurePasswordDialog, setOpenConfigurePasswordDialog] = React.useState(false)

  const handleOpenConfigurePasswordDialog = () => {
    setOpenConfigurePasswordDialog(true)
  }

  const handleCloseConfigurePasswordDialog = () => {
    setOpenConfigurePasswordDialog(false)
  }

  const onSubmit = (data: PasswordForm) => {
    console.log(data)
  }

  return (
    <>
      <Observer>
        {() => (
          <>
            <Box sx={{ p: 2, flexGrow: 1, flex: 1 }}>
              <Typography>{LL.option.multiAccount.notConfigured()}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button variant='outlined' onClick={handleOpenConfigurePasswordDialog}>
                  {LL.option.multiAccount.configurePassword()}
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Observer>
      <Dialog open={openConfigurePasswordDialog} onClose={handleCloseConfigurePasswordDialog}>
        <DialogTitle>Configure master password</DialogTitle>
        <DialogContent>
          <DialogContentText>All app&apos;s settings will be reset to their default value</DialogContentText>
          <Stack
            id='password-form'
            spacing={2}
            sx={{ mt: 2 }}
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
          >
            <PasswordElement
              name='password'
              control={control}
              required
              fullWidth
              label={LL.option.features.group.autoGroup.leader()}
            />
            <PasswordRepeatElement
              name='password_repeat'
              passwordFieldName='password'
              control={control}
              fullWidth
              label={LL.option.features.group.autoGroup.leader()}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfigurePasswordDialog}>Cancel</Button>
          <Button variant='outlined' type='submit' form='password-form'>
            Validate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
