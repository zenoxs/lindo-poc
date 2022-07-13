import React, { useEffect } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
import { PasswordElement, PasswordRepeatElement } from 'react-hook-form-mui'
import { useForm } from 'react-hook-form'
import { Observer } from 'mobx-react-lite'
import { useI18nContext } from '@lindo/i18n'
import { AccountContainer } from './account-container'

interface PasswordForm {
  password: string
  password_repeat: string
}

export const OptionMultiAccount = () => {
  const { LL } = useI18nContext()
  const { control, handleSubmit, reset } = useForm<PasswordForm>()
  const [openConfigurePasswordDialog, setOpenConfigurePasswordDialog] = React.useState(false)
  const [isMasterPasswordConfigured, setMasterPasswordConfigured] = React.useState(false)

  const handleOpenConfigurePasswordDialog = () => {
    reset()
    setOpenConfigurePasswordDialog(true)
  }

  const handleCloseConfigurePasswordDialog = () => {
    reset()
    setOpenConfigurePasswordDialog(false)
  }

  useEffect(() => {
    window.lindoAPI.isMasterPasswordConfigured().then((isConfigured) => {
      setMasterPasswordConfigured(isConfigured)
    })
  })

  const onSubmit = async (data: PasswordForm) => {
    await window.lindoAPI.saveMasterPassword(data.password)
    console.log('1')
    await window.lindoAPI.isMasterPasswordConfigured().then((isConfigured) => {
      console.log(isConfigured)
      setMasterPasswordConfigured(isConfigured)
    })
    console.log('3')
  }

  return (
    <>
      <Observer>
        {() => (
          <Box>
            <Box sx={{ p: 2, flexGrow: 1, flex: 1 }}>
              {!isMasterPasswordConfigured && (
                <>
                  <Typography>{LL.option.multiAccount.notConfigured()}</Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button variant='outlined' onClick={handleOpenConfigurePasswordDialog}>
                      {LL.option.multiAccount.configurePassword()}
                    </Button>
                  </Box>
                </>
              )}
              {isMasterPasswordConfigured && (
                <>
                  <Typography>The multi account is enabled with your master password</Typography>

                  <Stack spacing={2} direction='row' sx={{ mt: 3 }}>
                    <Button variant='outlined' onClick={handleOpenConfigurePasswordDialog}>
                      Change password
                    </Button>
                    <Button variant='outlined' onClick={handleOpenConfigurePasswordDialog}>
                      Remove the password
                    </Button>
                  </Stack>
                </>
              )}
            </Box>
            {isMasterPasswordConfigured && (
              <Box>
                <AccountContainer />
              </Box>
            )}
          </Box>
        )}
      </Observer>
      <Dialog open={openConfigurePasswordDialog} onClose={handleCloseConfigurePasswordDialog}>
        <DialogTitle>Configure master password</DialogTitle>
        <DialogContent>
          <Stack
            id='password-form'
            spacing={2}
            sx={{ mt: 2 }}
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
          >
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
          <Button onClick={handleCloseConfigurePasswordDialog}>Cancel</Button>
          <Button variant='outlined' type='submit' form='password-form'>
            Validate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
