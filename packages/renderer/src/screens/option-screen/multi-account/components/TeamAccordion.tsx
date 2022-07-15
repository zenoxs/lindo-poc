import React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  CardHeader,
  darken,
  Grid,
  Stack,
  Typography,
  useTheme
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { CharacterCard } from './CharacterCard'
import { GameTeam } from '@lindo/shared'
import { useStores } from '@/store'
import { FormTeamDialog } from '../form-team-dialog'
import { useDialog } from '@/hooks'

export const TeamAccordion = ({ team }: { team: GameTeam }) => {
  const {
    optionStore: { gameMultiAccount }
  } = useStores()
  const theme = useTheme()
  const [openFormTeamDialog, , toggleFormTeamDialog] = useDialog()

  const handleRemoveTeam = (team: GameTeam) => {
    gameMultiAccount.removeTeam(team)
  }

  const handleEditTeam = () => {
    toggleFormTeamDialog()
  }

  return (
    <>
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
          <Stack direction='row' sx={{ mt: 2 }}>
            <Button onClick={() => handleEditTeam()}>Edit Team</Button>
            <Button onClick={() => handleRemoveTeam(team)} color='error'>
              Delete team
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <FormTeamDialog open={openFormTeamDialog} value={team} onClose={toggleFormTeamDialog} />
    </>
  )
}
