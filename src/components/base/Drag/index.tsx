import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
type Item = {
  id: string
}

type DragItemProps = {
  id: string
  children: React.ReactNode
}

// 可拖动组件
function DragItem(props: DragItemProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: { id: props.id } as Item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {props.children}
    </div>
  )
}
export default DragItem
