import { useI18nContext } from '@lindo/i18n'
import {
  Box,
  Button,
  darken,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Tab,
  Tabs,
  useTheme
} from '@mui/material'
import React, { useState } from 'react'
import { OptionFeatures } from './features'
import { OptionGeneral } from './general'
import { OptionNotifications } from './notifications'
import { OptionShortcuts } from './shortcuts'
import { TabPanel } from './TabPanel'

export const OptionScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [openResetDialog, setOpenResetDialog] = React.useState(false)
  const { LL } = useI18nContext()
  const theme = useTheme()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  const handleOpenResetDialog = () => {
    setOpenResetDialog(true)
  }

  const handleCloseResetDialog = () => {
    setOpenResetDialog(false)
  }

  const handleResetStore = () => {
    window.lindoAPI.resetStore()
    handleCloseResetDialog()
  }
  return (
    <>
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
            flexDirection: 'column'
          }}
        >
          <Paper
            square
            sx={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              overflowY: 'scroll'
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
          </Paper>
          <Box
            sx={{
              backgroundColor: darken(theme.palette.background.paper, 0.2),
              padding: theme.spacing(1),
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Button color='error' onClick={handleOpenResetDialog}>
              Reset Settings
            </Button>
            <Button variant='contained' onClick={() => window.lindoAPI.closeOptionWindow()}>
              Close
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog open={openResetDialog} onClose={handleCloseResetDialog}>
        <DialogTitle>Reset all the settings ?</DialogTitle>
        <DialogContent>
          <DialogContentText>All app&apos;s settings will be reset to their default value</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetStore}>Reset</Button>
          <Button onClick={handleCloseResetDialog} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
