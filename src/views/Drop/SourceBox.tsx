import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import React from 'react'

type Item = {
  id: number
  text: string
}

type ListItemProps = {
  item: Item
  onMoveItem: (dragIndex: number, hoverIndex: number) => void
}

// 列表项组件
function ListItem(props: ListItemProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: { id: props.item.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'item',
    hover(item: Item, monitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.id
      const hoverIndex = props.item.id

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset: any = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      props.onMoveItem(dragIndex, hoverIndex)
      item.id = hoverIndex
    },
  })

  drag(drop(ref))

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {props.item.text}
    </div>
  )
}

export default ListItem
