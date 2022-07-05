import React from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { TabPanel } from '../TabPanel'
import { useStores } from '@/store'
import { Observer } from 'mobx-react-lite'

export const OptionFeatures = () => {
  const [value, setValue] = React.useState(0)
  const { hotkeyStore } = useStores()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Observer>
      {() => (
        <Box sx={{ p: 1, flexGrow: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='features-tabs'>
              <Tab label='General' />
              <Tab label='Fight' />
              <Tab label='Group' />
              <Tab label='Account' />
            </Tabs>
          </Box>
          <Box sx={{ flex: 1, flexGrow: 1 }}>
            <TabPanel value={value} index={0}></TabPanel>
          </Box>
        </Box>
      )}
    </Observer>
  )
}
