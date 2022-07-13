import React, { useEffect } from 'react'
import { useStores } from '@/store'
import { GameTeamSnapshotIn } from '@lindo/shared'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { TextFieldElement } from 'react-hook-form-mui'

export interface AddTeamDialogProps {
  open: boolean
  onClose: () => void
}

export const AddTeamDialog = ({ onClose, open }: AddTeamDialogProps) => {
  const { optionStore } = useStores()
  const { control, handleSubmit, reset } = useForm<GameTeamSnapshotIn>()

  useEffect(() => {
    reset()
  }, [open])

  const onSubmit = (data: GameTeamSnapshotIn) => {
    optionStore.gameMultiAccount.addTeam(data)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add new team</DialogTitle>
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
          <TextFieldElement name='name' control={control} required fullWidth label={'Team Name'} />
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
