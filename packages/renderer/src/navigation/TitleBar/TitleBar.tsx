import { Box } from '@mui/material'
import React from 'react'
import styles from './title-bar.module.scss'

export const TitleBar = () => {
  return <Box sx={{ width: '100vh', height: '25px' }} className={styles['title-bar']}></Box>
}
