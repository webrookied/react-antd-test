import { useState, useRef, useEffect } from 'react'
import cx from './workflow.module.scss'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrag, useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'
import './style.scss'

export const NodeRect = { width: 120, height: 38 }

const nodeList: any[] = [
  { id: 1, name: 'Apple-1', bg: 'red', type: 'box1' },
  { id: 2, name: 'Banana-2', bg: 'yellow', type: 'box2' },
  { id: 3, name: 'Orange-1', bg: 'orange', type: 'box1' },
  { id: 4, name: 'Grape-1', bg: 'purple', type: 'box1' },
  { id: 5, name: 'Watermelon-2', bg: 'green', type: 'box2' },
  { id: 6, name: 'Peach-1', bg: 'pink', type: 'box1' },
]

const transitions: any[] = [
  { id: 1, name: 'Apple-1', bg: 'red', type: 'box1' },
  { id: 2, name: 'Banana-2', bg: 'yellow', type: 'box2' },
  { id: 3, name: 'Orange-1', bg: 'orange', type: 'box1' },
  { id: 4, name: 'Grape-1', bg: 'purple', type: 'box1' },
  { id: 5, name: 'Watermelon-2', bg: 'green', type: 'box2' },
  { id: 6, name: 'Peach-1', bg: 'pink', type: 'box1' },
]

const TaskNode = ({ item, jsPlumb, id, updateNodePosition }: any) => {
  const [, dragRef] = useDrag({
    type: 'Card',
    item: { id: item.id, name: item.name, key: item.type },
  })

  useEffect(() => {
    console.log('id:-task-Node', id)
    if (jsPlumb) {
      jsPlumb.draggable(id, {
        containment: 'parent',
        grid: [5, 5],
        stop: ({ finalPos }) => {
          console.log('finalPos:', finalPos)
          updateNodePosition({ id, finalPos })
        },
      })
    }
  }, [id, jsPlumb])
  return (
    <span ref={dragRef} style={{ left: item.x, top: item.y }} id={id} className={cx['status-item']}>
      {item.name}
    </span>
  )
}

const DragComponent = () => {
  const jsPlumbInstanceObject = useRef(null)
  const [status, setStatus] = useState(nodeList)
  const [nodes, setNodes] = useState<any[]>([])
  const [jsPlumbInstance, setJsPlumb] = useState(null)
  const [transitions, setTransitions] = useState([])
  const workflowWrapper = useRef<any>(null)
  const [offset, setOffset] = useState<{ top: number; left: number }>()

  useEffect(() => {
    import('jsplumb').then(({ jsPlumb }: any) => {
      jsPlumb.ready(() => {
        // console.log('jsplumb:', jsPlumb.getInstance())
        const instance = jsPlumb.getInstance()
        jsPlumbInstanceObject.current = instance
        setJsPlumb(instance)
      })
    })
  }, [])

  // useEffect(() => {
  //   if (jsPlumb) {
  //     if (!isView) {
  //       jsPlumb.draggable(id, {
  //         containment: 'parent',
  //         grid: [5, 5],
  //         stop: ({ finalPos }) => {
  //           updateNodePosition(id, finalPos)
  //         },
  //       })
  //     }
  //     jsPlumb.addEndpoint(id, { anchor: 'Bottom', uuid: id + '-bottom' }, CommonConfig)
  //   }
  // }, [id, jsPlumb, isView, updateNodePosition])

  const [collectProps, dropRef] = useDrop({
    accept: 'Card',
    collect: (minoter: any) => ({
      isOver: minoter.isOver(),
    }),
    drop: (source: any, monitor) => {
      // console.log('---:', monitor.getClientOffset())
      const { x, y } = (monitor as any).getClientOffset()
      // console.log('source:-----x-y', x, y)
      const { id, name, key } = source

      if (offset) {
        console.log('offset:', offset)
        const left = x - offset.left - NodeRect.width / 2 - 300
        const top = y - offset.top - NodeRect.height / 2
        const { scrollTop, scrollLeft } = workflowWrapper.current
        nodes.push({
          width: NodeRect.width,
          height: NodeRect.height,
          name,
          x: Math.max(0, left) + scrollLeft,
          y: Math.max(0, top) + scrollTop,
          id: id + '-' + uuidv4(),
          statusId: id,
          key,
          selected: false,
          parameters: {},
        })
        console.log('nodes:', nodes)
        setNodes(nodes)
      }
    },
  })

  useEffect(() => {
    setOffset({
      top: workflowWrapper?.current.offsetTop || 0,
      left: workflowWrapper?.current.offsetLeft || 0,
    })
  }, [])

  const updateNodePosition = (res) => {
    console.log('updateNodePosition:', res)
    // setNodes(nodes => nodes.filter(v => v.))
    setNodes((nodes) => {
      const idx = nodes.findIndex((node) => node.id === res.id)
      if (idx > -1) {
        nodes[idx].x = res.finalPos[0]
        nodes[idx].y = res.finalPos[1]
      }
      return nodes
    })
  }

  useEffect(() => {
    console.log('更新后的-nodes:', nodes)
  }, [nodes])

  return (
    <div className={cx['workflow-container']} ref={workflowWrapper}>
      {/* 左侧 */}
      <div className={cx.status}>
        {status.map((item) => {
          return <TaskNode key={item.id} item={item}></TaskNode>
        })}
      </div>
      {/* 右侧 */}
      <div className={cx.palette} ref={dropRef}>
        {/* <div className={cx['status-item']} style={{ left: 10, top: 100 }}></div> */}
        {nodes.map((item: any) => {
          return (
            <TaskNode
              updateNodePosition={updateNodePosition}
              id={item.id}
              jsPlumb={jsPlumbInstance}
              key={item.id}
              item={item}></TaskNode>
          )
        })}
      </div>
    </div>
  )
}

const Workflow = () => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <DragComponent></DragComponent>
      </DndProvider>
    </>
  )
}

export default Workflow
