import React, { useEffect } from 'react'
import { useStores } from '@/store'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useForm, useFieldArray } from 'react-hook-form'
import { TextFieldElement } from 'react-hook-form-mui'
import { TeamWindowCard, TeamWindowForm } from './TeamWindowCard'
import { GameTeamSnapshotIn } from '@lindo/shared'

export interface AddTeamDialogProps {
  open: boolean
  onClose: () => void
}

export interface TeamForm {
  name: string
  windows: Array<TeamWindowForm>
}

export const AddTeamDialog = ({ onClose, open }: AddTeamDialogProps) => {
  const { optionStore } = useStores()
  const { control, handleSubmit, reset } = useForm<TeamForm>({
    defaultValues: {
      windows: [{}]
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'windows'
  })

  useEffect(() => {
    reset()
  }, [open])

  const onSubmit = (data: TeamForm) => {
    const team: GameTeamSnapshotIn = {
      name: data.name,
      windows: data.windows.map((window) => ({
        characters: window.characters.map((c) => c.id)
      }))
    }
    optionStore.gameMultiAccount.addTeam(team)
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
            {fields.map((window, index) => (
              <Grid key={index} item xs={6}>
                <TeamWindowCard onRemove={() => remove(index)} index={index} control={control} />
              </Grid>
            ))}
          </Grid>
          <Button startIcon={<AddIcon />} variant='outlined' sx={{ mt: 2 }} onClick={() => append({})}>
            Add window
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant='contained' type='submit' form='character-form'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
