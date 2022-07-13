import { useStores } from '@/store'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  lighten,
  Typography,
  useTheme
} from '@mui/material'
import { Observer } from 'mobx-react-lite'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import React from 'react'
import { CharacterCard } from './CharacterCard'
import { useDialog } from '@/hooks'
import { AddCharacterDialog } from './AddCharacterDialog'
import { AddTeamDialog } from './AddTeamDialog'

export const AccountContainer = () => {
  const theme = useTheme()
  const { optionStore } = useStores()
  const [openAddCharacterDialog, , toggleAddCharacterDialog] = useDialog()
  const [openAddTeamDialog, , toggleAddTeamDialog] = useDialog()

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

  return (
    <>
      <Box
        sx={{ flexDirection: 'row', p: 2, display: 'flex', gap: '10px', width: 'calc(100vw - 150px)' }}
        style={{ overflowX: 'auto' }}
      >
        <Card style={cardStyle}>
          <CardContent>
            <Button onClick={toggleAddCharacterDialog} size='small' startIcon={<AddIcon />}>
              Add Account
            </Button>
          </CardContent>
        </Card>
        <Observer>
          {() => (
            <>
              {optionStore.gameMultiAccount.characters.map((character) => (
                <CharacterCard key={character.id} style={cardStyle} character={character} />
              ))}
            </>
          )}
        </Observer>
      </Box>
      <Box sx={{ p: 2 }}>
        <Observer>
          {() => (
            <>
              {optionStore.gameMultiAccount.teams.map((team) => (
                <Accordion key={team.id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
                    <Typography>{team.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                      blandit leo lobortis eget.
                    </Typography>
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
