import { useGameContext } from '@/providers'
import { useStores } from '@/store'
import { GameCharacter } from '@lindo/shared'
import { Box, Button, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Observer } from 'mobx-react-lite'
import React from 'react'
import { CharacterGenericCard } from './CharacterGenericCard'

export interface CharacterCardProps {
  character: GameCharacter
  onSelect?: (character: GameCharacter) => void
}

export const CharacterCard = ({ character, onSelect }: CharacterCardProps) => {
  const { optionStore } = useStores()
  const [displayImage, setDisplayImage] = React.useState(true)
  const gameContext = useGameContext()

  const handleDeleteCharacter = (character: GameCharacter) => {
    optionStore.gameMultiAccount.removeCharacter(character)
  }

  return (
    <Observer>
      {() => (
        <>
          <CharacterGenericCard key={character.id}>
            <div
              style={{
                height: '140px',
                width: '100%',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0
              }}
            >
              {displayImage ? (
                <CardMedia
                  style={{
                    height: 'auto',
                    position: 'absolute',
                    width: '100%',
                    bottom: '0'
                  }}
                  component='img'
                  image={gameContext.characterImagesSrc + character.name + '.png'}
                  onError={() => {
                    setDisplayImage(false)
                  }}
                  alt='green iguana'
                />
              ) : (
                <Box sx={{ display: 'flex', p: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant='caption'>Character image will be save during the login</Typography>
                </Box>
              )}
            </div>
            <CardContent sx={{ padding: 0, flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {character.name}
            </CardContent>
            <CardActions>
              {onSelect ? (
                <Button size='small' onClick={() => onSelect(character)}>
                  Select
                </Button>
              ) : (
                <>
                  <Button color='error' onClick={() => handleDeleteCharacter(character)} size='small'>
                    Delete
                  </Button>
                  <Button size='small' disabled={true}>
                    Edit
                  </Button>
                </>
              )}
            </CardActions>
          </CharacterGenericCard>
        </>
      )}
    </Observer>
  )
}
