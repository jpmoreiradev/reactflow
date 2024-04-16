import React, { DragEvent, useCallback, useEffect } from 'react';
import {
  Node,
  ReactFlowProvider,
  Controls,
  useReactFlow,
  NodeMouseHandler,
  OnConnect,
  addEdge,
  Background,
} from 'reactflow';
import ReactFlow from 'react-flow-renderer';
import Sidebar from './Sidebar';
import useCursorStateSynced from './useCursorStateSynced';
import useNodesStateSynced from './useNodesStateSynced';
import useEdgesStateSynced from './useEdgesStateSynced';
import DragHandleNode from './DragHandleNode';
import 'reactflow/dist/style.css';
import Cursors from './Cursors';

const proOptions = {
  account: 'paid-pro',
  hideAttribution: true,
};

const nodeTypes = {
  dragHandleNode: DragHandleNode,
};

const initialNode: Node = {
  id: 'initial-node', 
  type: 'dragHandleNode', 
  style: { border: '1px solid #444', padding: '20px 40px', backgroundColor: '#333', borderRadius: '5px' },
  data: { label: 'Start' },
  position: { x: 100, y: 100 }, 
};

const ReactFlowPro: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesStateSynced();
  const [edges, setEdges, onEdgesChange] = useEdgesStateSynced();
  const [cursors, onMouseMove] = useCursorStateSynced();
  const { screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    setNodes([initialNode]);
  }, [setNodes]);

  const onConnect: OnConnect = useCallback(
    params => {
      setEdges(prev => addEdge(params, prev));
    },
    [setEdges]
  );

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    const type = event.dataTransfer.getData('application/reactflow');
    const position = screenToFlowPosition({
      x: event.clientX - 80,
      y: event.clientY - 20,
    });

    const newNode: Node = {
      id: `${Date.now()}`,
      type: 'dragHandleNode',
      style: { border: '1px solid #444', padding: '20px 40px', backgroundColor: '#333', borderRadius: '5px' },
      position,
      data: { label: `${type}` },
    };

    setNodes(prev => [...prev, newNode]);
  };

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, clicked) => {
      setNodes(prev =>
        prev.map(node =>
          node.id === clicked.id ? { ...node, className: 'blink' } : node
        )
      );

      setTimeout(() => {
        setNodes(prev =>
          prev.map(node =>
            node.id === clicked.id ? { ...node, className: undefined } : node
          )
        );
      }, 3000);
    },
    [setNodes]
  );

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="react-flow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          onNodeClick={onNodeClick}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={(event: DragEvent) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
          }}
          onPointerMove={onMouseMove}
          proOptions={proOptions}
          nodeTypes={nodeTypes}
        >
          <Cursors cursors={cursors} />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

const Flow: React.FC = () => {
  return (
    <ReactFlowProvider>
      <ReactFlowPro />
    </ReactFlowProvider>
  );
};

export default Flow;
