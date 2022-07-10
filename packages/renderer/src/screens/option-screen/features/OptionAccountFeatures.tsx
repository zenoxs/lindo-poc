import React from 'react'
import { Box, Checkbox, FormControl, FormControlLabel } from '@mui/material'
import { Observer } from 'mobx-react-lite'
import { useI18nContext } from '@lindo/i18n'
import { useStores } from '@/store'

export const OptionAccountFeatures = () => {
  const { LL } = useI18nContext()
  const { optionStore } = useStores()

  return (
    <Observer>
      {() => (
        <>
          <Box sx={{ p: 2, flexGrow: 1, flex: 1 }}></Box>
        </>
      )}
    </Observer>
  )
}
