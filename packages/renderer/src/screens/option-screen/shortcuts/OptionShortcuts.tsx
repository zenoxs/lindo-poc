import React from 'react'
import { Box, Grid, Stack, Tab, Tabs, Typography } from '@mui/material'
import { TabPanel } from '../TabPanel'
import { ShortcutInput } from './ShortcutInput'
import { useStores } from '@/store'

export const OptionShortcuts = () => {
  const [value, setValue] = React.useState(0)
  const { hotkeyStore } = useStores()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ p: 1, flexGrow: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='Application' />
          <Tab label='Interface' />
          <Tab label='Spells' />
          <Tab label='Inventory' />
          <Tab label='Various' />
          <Tab label='Mods' />
        </Tabs>
      </Box>
      <Box sx={{ flex: 1, flexGrow: 1 }}>
        <TabPanel value={value} index={0}>
          <Grid component='form' noValidate autoComplete='off' container spacing={1} margin={0}>
            <Grid item xs={3}>
              <Stack spacing={2}>
                <ShortcutInput id='new-window' label='New window' value={hotkeyStore.window.newWindow} />
                <ShortcutInput id='new-tab' label='New tab' value={hotkeyStore.window.newTab} />
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={2}>
                <ShortcutInput id='next-tab' label='Next tab' value={hotkeyStore.window.nextTab} />
                <ShortcutInput id='previous-tab' label='Previous tab' value={hotkeyStore.window.prevTab} />
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={2}>
                {Array.from({ length: 4 }, (_, k) => k).map((i) => (
                  <ShortcutInput
                    id={'tab-' + i}
                    key={'tab-' + i}
                    label={'Tab ' + (i + 1)}
                    value={hotkeyStore.window.tabs[i]}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={2}>
                {Array.from({ length: 4 }, (_, k) => k + 4).map((i) => (
                  <ShortcutInput
                    id={'tab-' + i}
                    key={'tab-' + i}
                    label={'Tab ' + (i + 1)}
                    value={hotkeyStore.window.tabs[i]}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
      <Typography>
        You can use special keys CTRL, SHIFT, SPACE, ALT (CTRL = cmd on Mac OS X) You can specify your shortcut by
        pressing the desired keys at the same time after selecting the input
      </Typography>
    </Box>
  )
}
