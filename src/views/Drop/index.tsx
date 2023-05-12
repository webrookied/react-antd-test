// 忽略部分内容，小伙伴们自行补齐
// import DragItem from 'components/base/Drag'
// import DropZone from 'components/base/CustDrop'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
// import { useState } from 'react'
import { Container } from './TargetBox'
type Item = {
  id: number
  text: string
}
const items: Item[] = [
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
  { id: 4, text: 'Item 4' },
  { id: 5, text: 'Item 5' },
]

const Drop = () => {
  // const handleDrop = (id: string) => console.log(`Dropped item ${id}`)
  return (
    <DndProvider backend={HTML5Backend}>
      {/* <div>
        <DragItem id='item1'>Item 1</DragItem>
        <DragItem id='item2'>Item 2</DragItem>
        <DropZone id='zone1' onDrop={handleDrop}>
          Drop zone
        </DropZone>
      </div> */}
      <Container />
    </DndProvider>
  )
}
export default Drop
