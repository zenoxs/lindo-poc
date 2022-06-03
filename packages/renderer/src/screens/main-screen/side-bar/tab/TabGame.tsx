import React from 'react'
import styles from './tab.module.scss'
import classNames from 'classnames'
import { Icon, IconButton } from '@mui/material'
import { Game, useStores } from '@/store'
import { Observer } from 'mobx-react-lite'

export interface TabGameProps {
  game: Game
}

export const TabGame = ({ game }: TabGameProps) => {
  const { gameStore } = useStores()
  return (
    <Observer>
      {() => {
        const active = gameStore.selectedGame === game
        return (
          <div
            onClick={() => gameStore.selectGame(game)}
            className={classNames(styles.tab, styles['tab-game'], {
              [styles.focus]: active
            })}
          >
            <Icon sx={{ fontSize: 24 }}>keyboard</Icon>
            <IconButton className={styles['tab-close']}>
              <Icon sx={{ fontSize: 15, position: 'absolute', top: 2, left: 2 }}>close</Icon>
            </IconButton>
          </div>
        )
      }}
    </Observer>
  )
}
