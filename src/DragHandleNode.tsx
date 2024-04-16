import React, { memo, FC } from 'react';

import {
  Handle,
  Position,
  NodeProps,
  Connection,
  Edge,
} from 'react-flow-renderer';

const onConnect = (params: Connection | Edge) =>
  console.log('handle onConnect', params);

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
};

const connections = { 
  background: '#FFF',
  width: '10px',
  height: '10px',
  padding: '1px 1px',
  borderRadius: '50%',
  border: '2px solid #888' 
}

const ColorSelectorNode: FC<NodeProps> = () => {
  return (
    <>
      <Handle type="target" position={Position.Left} onConnect={onConnect} style={connections}  />
      <div style={labelStyle}>
        <span>Start</span>
        <span className="custom-drag-handle"/>
      </div>
      <Handle type="source" position={Position.Right} style={connections} />
    </>
  );
};

export default memo(ColorSelectorNode);
