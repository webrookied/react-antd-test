import React, { useEffect } from 'react'
import jsPlumb from 'jsplumb'

function App() {
  useEffect(() => {
    const instance = jsPlumb.getInstance({
      Container: 'diagram',
      Connector: ['Bezier', { curviness: 50 }],
      Endpoint: ['Dot', { radius: 4 }],
      PaintStyle: { stroke: '#666', strokeWidth: 2 },
      HoverPaintStyle: { stroke: '#f00', strokeWidth: 2 },
    })
    const nodes = document.querySelectorAll('.node')
    for (let i = 0; i < nodes.length; i++) {
      instance.draggable(nodes[i])
    }
    instance.bind('connection', function (info) {
      console.log('Connection created:', info.sourceId, '-', info.targetId)
    })
    instance.makeSource(nodes, {
      filter: '.node',
      anchor: 'RightMiddle',
      connectorStyle: { stroke: '#666', strokeWidth: 2 },
      maxConnections: -1,
    })
    instance.makeTarget(nodes, {
      filter: '.node',
      anchor: 'LeftMiddle',
      allowLoopback: true,
      maxConnections: -1,
    })
    instance.connect({ source: 'node1', target: 'node2' })
    instance.connect({ source: 'node2', target: 'node3' })
    return function cleanup() {
      instance.deleteEveryEndpoint()
      instance.reset()
      instance.unbind()
    }
  }, [])

  return (
    <div id='diagram'>
      <div className='node' data-node-id='node1'>
        Node 1
      </div>
      <div className='node' data-node-id='node2'>
        Node 2
      </div>
      <div className='node' data-node-id='node3'>
        Node 3
      </div>
    </div>
  )
}

export default App
