import { useDrop } from 'react-dnd'

type DropZoneProps = {
  id: string
  onDrop: (id: string) => void
  children: React.ReactNode
}

function DropZone(props: DropZoneProps) {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'item',
    drop: () => props.onDrop(props.id),
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  })

  return (
    <div ref={drop} style={{ backgroundColor: canDrop ? 'yellow' : 'white' }}>
      {props.children}
    </div>
  )
}
export default DropZone
