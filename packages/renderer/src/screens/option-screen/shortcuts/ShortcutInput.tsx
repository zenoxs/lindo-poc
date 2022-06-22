import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { KeyboardEvent, useRef, useState } from 'react'
import { Close } from '@mui/icons-material'

export interface ShortcutInputProps {
  id: string
  label: string
  value: string
}

export const ShortcutInput = ({ id, label, value }: ShortcutInputProps) => {
  const keys = useRef<Array<string>>(value.split('+'))
  const [shortcut, setShortcut] = useState<string>(value)

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    console.log(event)
    keys.current.forEach((key: string, index) => {
      if (key === event.key) {
        delete keys.current[index]
      }
    })

    keys.current.push(event.key)

    let first = true
    let shortcut = ''

    keys.current.forEach((key) => {
      if (keys.current.length > 1 && !first) {
        shortcut += '+'
      }

      shortcut += key

      first = false
    })

    setShortcut(shortcut)
  }

  const handleClear = () => {
    keys.current = []
    setShortcut('')
  }

  return (
    <TextField
      id={id}
      label={label}
      onKeyDown={handleKeyDown}
      value={shortcut}
      onChange={() => null}
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
}
