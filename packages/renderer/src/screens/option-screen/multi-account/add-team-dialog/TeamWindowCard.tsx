import React from 'react'
import { GameCharacterSnapshotIn, GameTeamSnapshotIn, GameCharacter } from '@lindo/shared'
import { Button, Card, CardHeader, DialogActions, DialogContent, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { Control, useFieldArray } from 'react-hook-form'
import { useDialog } from '@/hooks'
import { SelectCharacterDialog } from './SelectCharacterDialog'
import { getSnapshot } from 'mobx-state-tree'

export interface TeamWindowCardProps {
  index: number
  control: Control<GameTeamSnapshotIn, object>
  onRemove: () => void
}

export interface _WindowForm {
  characters: Array<GameCharacterSnapshotIn>
}

export const TeamWindowCard = ({ index, control, onRemove }: TeamWindowCardProps) => {
  const [openSelectCharacterDialog, , toggleSelectCharacterDialog] = useDialog()
  const { fields, append } = useFieldArray<_WindowForm, 'characters', 'id'>({
    control: control as never,
    name: `windows.${index}.characters` as never
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
          {fields.map((character, index) => (
            <div key={index}>{character.name}</div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleSelectCharacterDialog} startIcon={<AddIcon />} size='small'>
            Add character
          </Button>
        </DialogActions>
      </Card>
      <SelectCharacterDialog
        onSelect={handleAddCharacter}
        open={openSelectCharacterDialog}
        onClose={toggleSelectCharacterDialog}
      />
    </>
  )
}
