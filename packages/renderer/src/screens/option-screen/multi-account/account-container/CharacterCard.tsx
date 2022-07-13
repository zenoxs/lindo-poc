import { useGameContext } from '@/providers'
import { useStores } from '@/store'
import { GameCharacter, GameCharacterSnapshot } from '@lindo/shared'
import { Box, Button, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Observer } from 'mobx-react-lite'
import React from 'react'
import { CharacterGenericCard, CharacterGenericSize, CHARACTER_SIZE_RATIO } from './CharacterGenericCard'

export interface CharacterCardProps {
  character: GameCharacter | GameCharacterSnapshot
  onSelect?: (character: GameCharacter) => void
  display?: 'preview' | 'action'
  size?: CharacterGenericSize
}

export const CharacterCard = ({ character, onSelect, display = 'action', size = 'large' }: CharacterCardProps) => {
  const { optionStore } = useStores()
  const [displayImage, setDisplayImage] = React.useState(true)
  const gameContext = useGameContext()

  const handleDeleteCharacter = (character: GameCharacter) => {
    optionStore.gameMultiAccount.removeCharacter(character)
  }

  const height = 65 * CHARACTER_SIZE_RATIO[size]

  return (
    <Observer>
      {() => (
        <>
          <CharacterGenericCard key={character.id} size={size}>
            <div
              style={{
                height: height + 'px',
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
                  {size !== 'small' && (
                    <Typography variant='caption'>Character image will be save during the login</Typography>
                  )}
                </Box>
              )}
            </div>
            <CardContent sx={{ padding: 0, flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {character.name}
            </CardContent>
            {display === 'action' && (
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
            )}
          </CharacterGenericCard>
        </>
      )}
    </Observer>
  )
}
