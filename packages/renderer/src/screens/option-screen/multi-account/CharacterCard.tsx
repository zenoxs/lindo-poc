import { useGameContext } from '@/providers'
import { useStores } from '@/store'
import { GameCharacter } from '@lindo/shared'
import { Button, Card, CardActions, CardContent, CardMedia } from '@mui/material'
import { Observer } from 'mobx-react-lite'
import React from 'react'

export interface CharacterCardProps {
  style: React.CSSProperties
  character: GameCharacter
}

export const CharacterCard = ({ style, character }: CharacterCardProps) => {
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
          <Card key={character.id} style={style}>
            <div
              style={{
                height: '140px',
                width: '100%',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0
              }}
            >
              {displayImage && (
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
              )}
            </div>
            <CardContent sx={{ padding: 0, flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {character.name}
            </CardContent>
            <CardActions>
              <Button color='error' onClick={() => handleDeleteCharacter(character)} size='small'>
                Delete
              </Button>
              <Button size='small' disabled={true}>
                Edit
              </Button>
            </CardActions>
          </Card>
        </>
      )}
    </Observer>
  )
}
