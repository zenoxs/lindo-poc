import { useI18nContext } from '@lindo/i18n'
import { Box, Tab, Tabs, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { OptionFeatures } from './features'
import { OptionGeneral } from './general'
import { OptionNotifications } from './notifications'
import { OptionShortcuts } from './shortcuts'
import { TabPanel } from './TabPanel'

export const OptionScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const { LL } = useI18nContext()
  const theme = useTheme()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  return (
    <Box sx={{ flexGrow: 1, width: '100vw', display: 'flex' }}>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={selectedTab}
        onChange={handleChange}
        aria-label='option-categories'
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label={LL.option.general.title()} />
        <Tab label={LL.option.shortcuts.title()} />
        <Tab label={LL.option.features.title()} />
        <Tab label={LL.option.notifications.title()} />
        <Tab label={LL.option.about.title()} />
      </Tabs>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          overflowY: 'scroll',
          backgroundColor: theme.palette.background.paper
        }}
      >
        <TabPanel value={selectedTab} index={0}>
          <OptionGeneral />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <OptionShortcuts />
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          <OptionFeatures />
        </TabPanel>
        <TabPanel value={selectedTab} index={3}>
          <OptionNotifications />
        </TabPanel>
      </Box>
    </Box>
  )
}
