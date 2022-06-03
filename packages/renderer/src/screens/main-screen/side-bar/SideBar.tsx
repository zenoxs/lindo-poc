import React from 'react'
import { styled } from '@mui/system'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
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

const SideBarContainer = styled('div')({
  backgroundColor: '#353535',
  overflowX: 'hidden',
  overflowY: 'auto',
  width: '71px'
})

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

  return (
    <SideBarContainer>
      <Observer>
        {() => (
          <DndContext
            sensors={sensors}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
            collisionDetection={closestCenter}
          >
            <SortableContext items={gameStore.gameList} strategy={verticalListSortingStrategy}>
              {gameStore.gameList.map((game) => (
                <SortableItem key={game.id} game={game} />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </Observer>
      <TabAdd />
    </SideBarContainer>
  )

  // function handleDragEnd(event: DragEndEvent) {
  //   const { active, over } = event

  //   if (active.id !== over?.id) {
  //     setItems((items) => {
  //       const oldIndex = items.indexOf(active.id as number)
  //       const newIndex = items.indexOf(over!.id as number)

  //       return arrayMove(items, oldIndex, newIndex)
  //     })
  //   }
  // }
}
