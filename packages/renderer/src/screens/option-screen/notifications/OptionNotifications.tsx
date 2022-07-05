import React from 'react'
import { Box, Checkbox, FormControl, FormControlLabel, Typography } from '@mui/material'
import { useStores } from '@/store'
import { Observer } from 'mobx-react-lite'

export const OptionNotifications = () => {
  const { optionStore } = useStores()
  return (
    <Observer>
      {() => (
        <>
          <Box sx={{ p: 2, flexGrow: 1, flex: 1 }}>
            <Typography>
              You can receive notifications from the game when the application is on the background. You will be
              notified:
            </Typography>
            <FormControl fullWidth>
              <FormControlLabel
                control={<Checkbox />}
                label='When your turn starts (fight)'
                checked={optionStore.gameNotification.fightTurn}
                onChange={(_, checked) => optionStore.gameNotification.setFightTurn(checked)}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormControlLabel
                control={<Checkbox />}
                label='By incoming private messages'
                checked={optionStore.gameNotification.privateMessage}
                onChange={(_, checked) => optionStore.gameNotification.setPrivateMessage(checked)}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormControlLabel
                control={<Checkbox />}
                label='When a tax collector is attacked'
                checked={optionStore.gameNotification.taxCollector}
                onChange={(_, checked) => optionStore.gameNotification.setTaxCollector(checked)}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormControlLabel
                control={<Checkbox />}
                label='When a kolizeum fight is found'
                checked={optionStore.gameNotification.kolizeum}
                onChange={(_, checked) => optionStore.gameNotification.setKolizeum(checked)}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormControlLabel
                control={<Checkbox />}
                label='When someone invites you to join a group'
                checked={optionStore.gameNotification.partyInvitation}
                onChange={(_, checked) => optionStore.gameNotification.setPartyInvitation(checked)}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormControlLabel
                control={<Checkbox />}
                label='When someone aggresses you'
                checked={optionStore.gameNotification.agression}
                onChange={(_, checked) => optionStore.gameNotification.setAgression(checked)}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormControlLabel
                control={<Checkbox />}
                label='When an item is sold'
                checked={optionStore.gameNotification.itemSold}
                onChange={(_, checked) => optionStore.gameNotification.setItemSold(checked)}
              />
            </FormControl>
          </Box>
        </>
      )}
    </Observer>
  )
}
