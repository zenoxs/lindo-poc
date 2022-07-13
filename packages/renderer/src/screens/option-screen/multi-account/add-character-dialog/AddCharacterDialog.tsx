import React, { useEffect } from 'react'
import { useStores } from '@/store'
import { GameCharacterSnapshotIn } from '@lindo/shared'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { PasswordElement, TextFieldElement } from 'react-hook-form-mui'

export interface AddCharacterDialogProps {
  open: boolean
  onClose: () => void
}

export const AddCharacterDialog = ({ onClose, open }: AddCharacterDialogProps) => {
  const { optionStore } = useStores()
  const { control, handleSubmit, reset } = useForm<GameCharacterSnapshotIn>()

  useEffect(() => {
    reset()
  }, [open])

  const onSubmit = (data: GameCharacterSnapshotIn) => {
    optionStore.gameMultiAccount.addCharacter(data)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add new character account</DialogTitle>
      <DialogContent>
        <Stack
          id='character-form'
          spacing={2}
          sx={{ mt: 2 }}
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextFieldElement name='account' control={control} required fullWidth label={'Account'} />
          <PasswordElement name='password' control={control} required fullWidth label={'Password'} />
          <TextFieldElement name='name' control={control} required fullWidth label={'Character'} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant='outlined' type='submit' form='character-form'>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}
