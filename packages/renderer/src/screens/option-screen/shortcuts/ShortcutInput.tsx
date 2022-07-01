import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { KeyboardEvent, memo, useRef, useState } from 'react'
import { Close } from '@mui/icons-material'
import { Observer } from 'mobx-react-lite'

export interface ShortcutInputProps {
  id: string
  label: string
  value: string
  onChange?: (shortcut: string) => void
}

// eslint-disable-next-line react/display-name
export const ShortcutInput = memo<ShortcutInputProps>(({ id, label, value, onChange }) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    event.stopPropagation()
    let key = ''
    let prefix = ''

    if (event.ctrlKey) {
      prefix += 'Ctrl+'
    }

    if (event.shiftKey) {
      prefix += 'Shift+'
    }

    if (event.altKey) {
      prefix += 'Alt+'
    }

    if (event.metaKey) {
      prefix += 'Meta+'
    }

    key = prefix + event.key.toUpperCase()

    if (onChange) onChange(key)
  }

  const handleClear = () => {
    if (onChange) onChange('')
  }

  return (
    <TextField
      id={id}
      label={label}
      onKeyDown={handleKeyDown}
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton aria-label='clear shortcut' onClick={handleClear} edge='end'>
              <Close />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
})
