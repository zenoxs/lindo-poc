import { Card, lighten, useTheme } from '@mui/material'
import React from 'react'

export interface CharacterGenericCardProps {
  children?: React.ReactNode | React.ReactNode[]
}

export const CharacterGenericCard = ({ children }: CharacterGenericCardProps) => {
  const theme = useTheme()
  const cardStyle: React.CSSProperties = {
    flexShrink: 0,
    height: '220px',
    width: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lighten(theme.palette.background.paper, 0.1)
  }
  return <Card style={cardStyle}>{children}</Card>
}
