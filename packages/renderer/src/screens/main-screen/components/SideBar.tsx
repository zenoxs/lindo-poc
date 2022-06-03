import React, { useState } from 'react'
import { styled } from '@mui/system'
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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'

import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'
import { Observer } from 'mobx-react-lite'
import { useStores } from '@/store'

const SideBarContainer = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  overflowX: 'hidden',
  overflowY: 'auto',
  width: '71px'
})

const TabStyled = styled('div')({
  width: 56,
  height: 56,
  cursor: 'pointer',
  margin: '7px auto 0 auto',
  borderRadius: '50%',
  backgroundColor: '#2b2b2b',
  textAlign: 'center',
  lineHeight: '100%',
  '&:hover': {
    backgroundColor: '#3e3e3e'
  }
})

const SortableItem = (props: { id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <TabStyled ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/* ... */}
    </TabStyled>
  )
}
export const SideBar = () => {
  // const [items, setItems] = useState([1, 2, 3])
  const { gameStore } = useStores()
  const sensors = useSensors(
    useSensor(PointerSensor),
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
                <SortableItem key={game.id} id={game.id} />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </Observer>
      <TabStyled onClick={() => gameStore.addGame()}>Add</TabStyled>
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
