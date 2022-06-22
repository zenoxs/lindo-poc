import React from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material'
import { LANGUAGES, RESOLUTIONS } from '@lindo/shared'

export const OptionGeneral = () => {
  return (
    <Box sx={{ p: 2, flexGrow: 1, flex: 1 }}>
      <Typography variant='h5' component='h2' gutterBottom>
        Interface
      </Typography>
      <FormControl sx={{ minWidth: 150, m: 1 }}>
        <InputLabel id='language-label'>Language</InputLabel>
        <Select labelId='language-label' id='language' label='Language' onChange={() => null}>
          {LANGUAGES.map((language) => (
            <MenuItem value={language.value} key={language.value}>
              {language.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 150, m: 1 }}>
        <InputLabel id='resolution-label'>Resolution</InputLabel>
        <Select labelId='resolution-label' id='resolution' label='Resolution' onChange={() => null}>
          {RESOLUTIONS.map((resolution) => (
            <MenuItem value={resolution.value} key={resolution.value}>
              {resolution.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <FormControlLabel control={<Checkbox />} label='Full Screen' />
      </FormControl>
      <FormControl fullWidth>
        <FormControlLabel control={<Checkbox />} label='Hide the shop button' />
      </FormControl>
      <FormControl fullWidth>
        <FormControlLabel control={<Checkbox />} label='Open menu when no window is open (ECHAP)' />
      </FormControl>
      <FormControl fullWidth>
        <FormControlLabel control={<Checkbox />} label="Automatically switch to account when it's turn start" />
      </FormControl>
      <hr />
      <Typography variant='h5' component='h2' gutterBottom>
        Sound
      </Typography>
      <FormControl fullWidth>
        <FormControlLabel control={<Checkbox />} label='Game sound only on foreground winddow' />
      </FormControl>
      <hr />
      <Typography variant='h5' component='h2' gutterBottom>
        Game Data
      </Typography>
      <Stack alignItems='flex-start' spacing={1}>
        <Button variant='outlined'>Re-download game data</Button>
        <Button variant='outlined'>Clear cache</Button>
      </Stack>
      <FormControl fullWidth>
        <FormControlLabel control={<Checkbox />} label='Play on dofus touch early' />
      </FormControl>
    </Box>
  )
}
