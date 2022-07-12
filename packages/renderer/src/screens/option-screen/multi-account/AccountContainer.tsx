import { useStores } from '@/store'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  lighten,
  Stack,
  useTheme
} from '@mui/material'
import { Observer } from 'mobx-react-lite'
import { PasswordElement, TextFieldElement } from 'react-hook-form-mui'
import { useForm } from 'react-hook-form'
import React from 'react'
import { GameCharacterSnapshotIn } from '@lindo/shared'
import { useGameContext } from '@/providers'

// gui.windowsContainer._childrenList[111].charactersTable._childrenList[1]._childrenList[0].tap()
// gui.windowsContainer._childrenList[111].btnPlay.tap()

export const AccountContainer = () => {
  const theme = useTheme()
  const { optionStore } = useStores()
  const gameContext = useGameContext()
  const { control, handleSubmit, reset } = useForm<GameCharacterSnapshotIn>()
  const [openAddCharacterDialog, setOpenAddCharacterDialog] = React.useState(false)

  const handleOpenAddCharacterDialog = () => {
    reset()
    setOpenAddCharacterDialog(true)
  }

  const handleCloseAddCharacterDialog = () => {
    reset()
    setOpenAddCharacterDialog(false)
  }

  const cardStyle: React.CSSProperties = {
    flexShrink: 0,
    height: '220px',
    width: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lighten(theme.palette.background.paper, 0.1)
  }

  const onSubmit = (data: GameCharacterSnapshotIn) => {
    console.log(data)
    optionStore.gameMultiAccount.addCharacter(data)
  }

  return (
    <>
      <Box
        sx={{ flexDirection: 'row', p: 2, display: 'flex', gap: '10px', width: 'calc(100vw - 150px)' }}
        style={{ overflowX: 'auto' }}
      >
        <Card style={cardStyle}>
          <CardContent>
            <Button onClick={handleOpenAddCharacterDialog}>Add Account</Button>
          </CardContent>
        </Card>
        <Observer>
          {() => (
            <>
              {optionStore.gameMultiAccount.characters.map((character) => (
                <Card key={character.name} style={cardStyle}>
                  <div
                    style={{
                      height: '140px',
                      width: '100%',
                      overflow: 'hidden',
                      position: 'relative',
                      flexShrink: 0
                    }}
                  >
                    <CardMedia
                      style={{
                        height: 'auto',
                        position: 'absolute',
                        width: '100%',
                        bottom: '0'
                      }}
                      component='img'
                      image={gameContext.characterImagesSrc + character.name + '.png'}
                      alt='green iguana'
                    />
                  </div>
                  <CardContent
                    sx={{ padding: 0, flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    {character.name}
                  </CardContent>
                  <CardActions>
                    <Button color='error' size='small'>
                      Delete
                    </Button>
                    <Button size='small'>Edit</Button>
                  </CardActions>
                </Card>
              ))}
            </>
          )}
        </Observer>
      </Box>
      <Dialog open={openAddCharacterDialog} onClose={handleCloseAddCharacterDialog}>
        <DialogTitle>Configure master password</DialogTitle>
        <DialogContent>
          <DialogContentText>All app&apos;s settings will be reset to their default value</DialogContentText>
          <Stack
            id='character-form'
            spacing={2}
            sx={{ mt: 2 }}
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextFieldElement name='account' control={control} required fullWidth label={'Account'} />
            <PasswordElement name='password' control={control} required fullWidth label={'Password'} />
            <TextFieldElement name='name' control={control} required fullWidth label={'Character'} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddCharacterDialog}>Cancel</Button>
          <Button variant='outlined' type='submit' form='character-form'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
