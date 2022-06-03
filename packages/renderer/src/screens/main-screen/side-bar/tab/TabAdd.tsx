import React from 'react'
import styles from './tab.module.scss'
import classNames from 'classnames'
import { Icon } from '@mui/material'
import { useStores } from '@/store'

export const TabAdd = () => {
  const { gameStore } = useStores()
  return (
    <div onClick={() => gameStore.addGame()} className={classNames(styles.tab, styles['tab-add'])}>
      <Icon sx={{ fontSize: 24 }}>add</Icon>
    </div>
  )
}
