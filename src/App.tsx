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
import TextNode from './components/TextNode';
import ImageNode from './components/ImageNode';
import VideoNode from './components/VideoNode';
import StartNode from './components/StartNode';
import 'reactflow/dist/style.css';
import Cursors from './Cursors';

const proOptions = {
  account: 'paid-pro',
  hideAttribution: true,
};

const nodeTypes = {
  imageNode: ImageNode as any,
  textNode: TextNode as any,
  videoNode: VideoNode as any,
  startNode: StartNode as any,
};

const initialNode: Node = {
  id: 'initial-node',
  type: 'startNode',
  style: {
    border: '1px solid #444',
    padding: '20px 40px',
    backgroundColor: '#18181b',
    borderRadius: '5px',
  },
  data: {},
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
      x: event.clientX - 50,
      y: event.clientY - 10,
    });
    console.log(type)
    if (type === 'video') {
      const newNode: Node = {
        id: `${Date.now()}`,
        type: 'videoNode',
        style: {
          border: '1px solid #444',
          padding: '20px 40px',
          backgroundColor: '#333',
          borderRadius: '5px',
        },
        position,
        data: { label: `${type}` },
      };
      setNodes(prev => [...prev, newNode]);
    } else if (type === 'image') {
      const newNode: Node = {
        id: `${Date.now()}`,
        type: 'imageNode',
        style: {
          border: '1px solid #444',
          padding: '20px 40px',
          backgroundColor: '#333',
          borderRadius: '5px',
        },
        position,
        data: { label: `${type}` },
      };
      setNodes(prev => [...prev, newNode]);
    } else {
      const newNode: Node = {
        id: `${Date.now()}`,
        type: 'textNode',
        style: {
          border: '1px solid #444',
          padding: '20px 40px',
          backgroundColor: '#333',
          borderRadius: '5px',
        },
        position,
        data: { label: `${type}` },
      };
      setNodes(prev => [...prev, newNode]);
    }
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

  const onDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes(prev => prev.filter(node => node.id !== nodeId));
      setEdges(prev => prev.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
    },
    [setNodes, setEdges]
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
          <Background 
              color="#2f2f39" // Cor de fundo
              gap={40} // Espaçamento entre as linhas da grade
              size={4} // Tamanho das células da grade
              style={{ backgroundColor: '#1f1f23' }} // Imagem de fundo 
          />
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
