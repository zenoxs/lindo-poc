import { useStores } from '@/store'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  darken,
  Grid,
  Typography,
  useTheme
} from '@mui/material'
import { Observer } from 'mobx-react-lite'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import React from 'react'
import { CharacterCard } from './CharacterCard'
import { useDialog } from '@/hooks'
import { AddCharacterDialog } from '../add-character-dialog'
import { AddTeamDialog } from '../add-team-dialog'
import { CharacterGenericCard } from './CharacterGenericCard'
import { GameTeam } from '@lindo/shared'

export const AccountContainer = () => {
  const {
    optionStore: { gameMultiAccount }
  } = useStores()
  const theme = useTheme()
  const [openAddCharacterDialog, , toggleAddCharacterDialog] = useDialog()
  const [openAddTeamDialog, , toggleAddTeamDialog] = useDialog()

  const handleRemoveTeam = (team: GameTeam) => {
    gameMultiAccount.removeTeam(team)
  }

  return (
    <>
      <Box
        sx={{ flexDirection: 'row', p: 2, display: 'flex', gap: '10px', width: 'calc(100vw - 150px)' }}
        style={{ overflowX: 'auto' }}
      >
        <CharacterGenericCard>
          <CardContent>
            <Button onClick={toggleAddCharacterDialog} size='small' startIcon={<AddIcon />}>
              Add Account
            </Button>
          </CardContent>
        </CharacterGenericCard>
        <Observer>
          {() => (
            <>
              {gameMultiAccount.characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </>
          )}
        </Observer>
      </Box>
      <Box sx={{ p: 2 }}>
        <Observer>
          {() => (
            <>
              {gameMultiAccount.teams.map((team) => (
                <Accordion key={team.id} sx={{ backgroundColor: darken(theme.palette.background.paper, 0.3) }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>{team.name}</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {team.allCharacters.map((c) => `${c.name}`).join(', ')}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {team.windows.map((window, index) => (
                        <Grid xs={6} item key={window.id}>
                          <Card>
                            <CardHeader title={'Window ' + (index + 1)}></CardHeader>
                            <CardContent>
                              <Grid container spacing={2}>
                                {window.characters.map((character) => (
                                  <Grid item key={character.id}>
                                    <CharacterCard display='preview' size='small' character={character} />
                                  </Grid>
                                ))}
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                    <Button onClick={() => handleRemoveTeam(team)} sx={{ mt: 2 }} color='error'>
                      Delete team
                    </Button>
                  </AccordionDetails>
                </Accordion>
              ))}
            </>
          )}
        </Observer>
        <Button size='small' sx={{ mt: 1 }} onClick={toggleAddTeamDialog} startIcon={<AddIcon />}>
          New Team
        </Button>
      </Box>
      <AddCharacterDialog open={openAddCharacterDialog} onClose={toggleAddCharacterDialog} />
      <AddTeamDialog open={openAddTeamDialog} onClose={toggleAddTeamDialog} />
    </>
  )
}
