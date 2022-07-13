import React from 'react'
import { Card, CardHeader, DialogContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export interface TeamWindowCardProps {
  position: number
}

export const TeamWindowCard = ({ position }: TeamWindowCardProps) => {
  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label='remove-window'>
            <CloseIcon />
          </IconButton>
        }
        title={'Window ' + position}
      />
      <DialogContent></DialogContent>
    </Card>
  )
}
