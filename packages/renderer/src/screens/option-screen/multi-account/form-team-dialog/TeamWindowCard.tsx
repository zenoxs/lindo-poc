import React from 'react'
import { GameCharacter, GameCharacterSnapshot } from '@lindo/shared'
import { Button, Card, CardHeader, DialogActions, DialogContent, Grid, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { Control, useFieldArray, useWatch } from 'react-hook-form'
import { useDialog } from '@/hooks'
import { SelectCharacterDialog } from './SelectCharacterDialog'
import { getSnapshot } from 'mobx-state-tree'
import { CharacterCard } from '../account-container/CharacterCard'
import { TeamForm } from './FormTeamDialog'

export interface TeamWindowCardProps {
  index: number
  control: Control<TeamForm, object>
  onRemove: () => void
}

export interface TeamWindowForm {
  characters: Array<GameCharacterSnapshot>
}

export const TeamWindowCard = ({ index, control, onRemove }: TeamWindowCardProps) => {
  const [openSelectCharacterDialog, , toggleSelectCharacterDialog] = useDialog()
  const { fields, append } = useFieldArray({
    control,
    name: `windows.${index}.characters`
  })
  const selectedCharacters: Array<GameCharacterSnapshot> = useWatch({
    control,
    name: `windows.${index}.characters`,
    defaultValue: []
  })

  const handleAddCharacter = (character: GameCharacter) => {
    append(getSnapshot(character))
    toggleSelectCharacterDialog()
  }

  return (
    <>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={onRemove} aria-label='remove-window'>
              <CloseIcon />
            </IconButton>
          }
          title={'Window ' + (index + 1)}
        />
        <DialogContent>
          <Grid container spacing={2}>
            {fields.map((character, index) => (
              <Grid item key={index}>
                <CharacterCard size='small' character={character} display='preview' />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleSelectCharacterDialog} startIcon={<AddIcon />} size='small'>
            Add character
          </Button>
        </DialogActions>
      </Card>
      <SelectCharacterDialog
        ignore={selectedCharacters.map((character) => character.id)}
        onSelect={handleAddCharacter}
        open={openSelectCharacterDialog}
        onClose={toggleSelectCharacterDialog}
      />
    </>
  )
}
