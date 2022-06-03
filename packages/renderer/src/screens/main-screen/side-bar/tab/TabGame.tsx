import React, { useRef, useEffect } from 'react'
import styles from './tab.module.scss'
import classNames from 'classnames'
import { Icon, IconButton } from '@mui/material'
import { Game, useStores } from '@/store'
import { Observer } from 'mobx-react-lite'
import { IObjectDidChange, observe } from 'mobx'

export interface TabGameProps {
  game: Game
}

export const TabGame = ({ game }: TabGameProps) => {
  const { gameStore } = useStores()
  const characterIconRef = useRef<HTMLDivElement>(null)

  const handleClose = (event: React.MouseEvent) => {
    gameStore.removeGame(game)
    return event.stopPropagation()
  }

  useEffect(() => {
    observe(game, (change: IObjectDidChange<Game>) => {
      if (change.name === 'characterIcon') {
        console.log('update character icon')
        if (characterIconRef.current && game.characterIcon) {
          characterIconRef.current.appendChild(game.characterIcon)
          characterIconRef.current.style.display = 'block'
        } else if (characterIconRef.current) {
          characterIconRef.current.innerHTML = ''
          characterIconRef.current.style.display = 'none'
        }
      }
    })
  }, [game])

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
            <div className={styles['icon-char']} ref={characterIconRef} />
            {!game.characterIcon && <Icon sx={{ fontSize: 24 }}>keyboard</Icon>}
            <IconButton className={styles['tab-close']} onClick={handleClose}>
              <Icon sx={{ fontSize: 15, position: 'absolute', top: 2, left: 2 }}>close</Icon>
            </IconButton>
          </div>
        )
      }}
    </Observer>
  )
}
