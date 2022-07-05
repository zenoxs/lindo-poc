import React from 'react'
import { styled } from '@mui/system'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'

import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'
import { Observer } from 'mobx-react-lite'
import { Game, useStores } from '@/store'
import { TabAdd, TabGame } from './tab'
import { Box, IconButton, useTheme } from '@mui/material'

const SideBarContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  overflowX: 'hidden',
  overflowY: 'auto',
  width: '71px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
}))

const SortableItem = ({ game }: { game: Game }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: game.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TabGame game={game} />
    </div>
  )
}
export const SideBar = () => {
  const { gameStore } = useStores()
  const theme = useTheme()
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 10
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleOpenOption = () => {
    window.lindoAPI.openOptionWindow()
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      gameStore.moveGame(active.id as string, over!.id as string)
    }
  }

  return (
    <SideBarContainer>
      <Observer>
        {() => (
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
            collisionDetection={closestCenter}
          >
            <SortableContext items={gameStore.gamesOrder.map((g) => g.id)} strategy={verticalListSortingStrategy}>
              {gameStore.gamesOrder.map((game) => (
                <SortableItem key={game.id} game={game} />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </Observer>
      <TabAdd />
      <Box sx={{ flex: 1 }} />
      <IconButton onClick={handleOpenOption} sx={{ color: theme.palette.text.primary, mb: 1 }} aria-label='settings'>
        <SettingsIcon />
      </IconButton>
    </SideBarContainer>
  )
}
