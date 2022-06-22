import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import { General } from './general'
import { TabPanel } from './TabPanel'

export const OptionScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', height: '100vh', width: '100vw' }}>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={selectedTab}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label='General' />
        <Tab label='Features' />
        <Tab label='Notifications' />
        <Tab label='About' />
      </Tabs>
      <Box sx={{ fisplay: 'flex', flex: 1, overflowY: 'scroll' }}>
        <TabPanel value={selectedTab} index={0}>
          <General />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={selectedTab} index={3}>
          Item Four
        </TabPanel>
      </Box>
    </Box>
  )
}
