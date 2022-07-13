import React, { useEffect } from 'react'
import { useStores } from '@/store'
import { GameTeamSnapshotIn } from '@lindo/shared'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { TextFieldElement } from 'react-hook-form-mui'
import { TeamWindowCard } from './TeamWindowCard'

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
    <Dialog open={open} onClose={onClose} maxWidth='md' fullScreen>
      <DialogTitle>Add new team</DialogTitle>
      <DialogContent>
        <Box
          id='character-form'
          sx={{ mt: 2 }}
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextFieldElement name='name' control={control} required fullWidth label={'Team Name'} />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <TeamWindowCard position={1} />
            </Grid>
            <Grid item xs={6}>
              <TeamWindowCard position={2} />
            </Grid>
          </Grid>
        </Box>
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
