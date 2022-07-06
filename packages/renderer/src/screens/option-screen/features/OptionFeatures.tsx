import React from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { TabPanel } from '../TabPanel'
import { Observer } from 'mobx-react-lite'
import { OptionGeneralFeatures } from './OptionGeneralFeatures'
import { OptionFightFeatures } from './OptionFightFeatures'
import { OptionGroupFeatures } from './option-group-features'
import { useI18nContext } from '@lindo/i18n'

export const OptionFeatures = () => {
  const [value, setValue] = React.useState(0)
  const { LL } = useI18nContext()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Observer>
      {() => (
        <Box sx={{ p: 1, flexGrow: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='features-tabs'>
              <Tab label={LL.option.features.general.header()} />
              <Tab label={LL.option.features.fight.header()} />
              <Tab label={LL.option.features.group.header()} />
              <Tab label={LL.option.features.job.header()} />
              <Tab label={LL.option.features.accounts.header()} />
            </Tabs>
          </Box>
          <Box sx={{ flex: 1, flexGrow: 1 }}>
            <TabPanel value={value} index={0}>
              <OptionGeneralFeatures />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <OptionFightFeatures />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <OptionGroupFeatures />
            </TabPanel>
          </Box>
        </Box>
      )}
    </Observer>
  )
}
