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
import { useStores } from '@/store'
import { Observer } from 'mobx-react-lite'

export const OptionGeneral = () => {
  const { appStore, optionStore } = useStores()
  return (
    <Observer>
      {() => (
        <>
          <Box sx={{ p: 2, flexGrow: 1, flex: 1 }}>
            <Typography variant='h5' component='h2' gutterBottom>
              Interface
            </Typography>
            <FormControl sx={{ minWidth: 150, m: 1 }}>
              <InputLabel id='language-label'>Language</InputLabel>
              <Select
                labelId='language-label'
                id='language'
                label='Language'
                value={appStore.language}
                onChange={(event) => appStore.setLanguageKey(event.target.value)}
              >
                {LANGUAGES.map((language) => (
                  <MenuItem value={language.value} key={language.value}>
                    {language.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150, m: 1 }}>
              <InputLabel id='resolution-label'>Resolution</InputLabel>
              <Select
                labelId='resolution-label'
                id='resolution'
                label='Resolution'
                value={optionStore.window.humanizeResolution}
                onChange={(event) => optionStore.window.setResolutionFromString(event.target.value)}
              >
                {RESOLUTIONS.map((resolution) => (
                  <MenuItem value={resolution} key={resolution}>
                    {resolution}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <FormControlLabel
                control={<Checkbox />}
                label='Full Screen'
                checked={optionStore.window.fullScreen}
                onChange={(_, checked) => optionStore.window.setFullScreen(checked)}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormControlLabel
                control={<Checkbox />}
                label='Hide the shop button'
                checked={optionStore.gameGeneral.hiddenShop}
                onChange={(_, checked) => optionStore.gameGeneral.setHiddenShop(checked)}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormControlLabel
                control={<Checkbox />}
                label='Open menu when no window is open (ECHAP)'
                checked={optionStore.gameGeneral.activeOpenMenu}
                onChange={(_, checked) => optionStore.gameGeneral.setActiveOpenMenu(checked)}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormControlLabel control={<Checkbox />} label="Automatically switch to account when it's turn start" />
            </FormControl>
            <hr />
            <Typography variant='h5' component='h2' gutterBottom>
              Sound
            </Typography>
            <FormControl fullWidth>
              <FormControlLabel
                control={<Checkbox />}
                label='Game sound only on foreground window'
                checked={optionStore.window.soundOnFocus}
                onChange={(_, checked) => optionStore.window.setSoundOnFocus(checked)}
              />
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
        </>
      )}
    </Observer>
  )
}
