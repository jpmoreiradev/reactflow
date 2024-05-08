import React, { memo, FC, useState } from 'react';

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
  flexDirection: 'column',
  alignItems: 'center',
} as any;

const connections = { 
  background: '#FFF',
  width: '10px',
  height: '10px',
  padding: '1px 1px',
  borderRadius: '50%',
  border: '2px solid #888' 
}

const ColorSelectorNode: FC<NodeProps> = () => {
  const [text, setText] = useState<string>("");
  const [savedText, setSavedText] = useState<string>("");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSaveText = () => {
    setSavedText(text);
  };

  return (
    <>
      <Handle type="target" position={Position.Left} onConnect={onConnect} style={connections}  />
      <div style={labelStyle}>
        <div>{savedText}</div>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text"
        />
        <button onClick={handleSaveText}>Save</button>
      </div>
      <Handle type="source" position={Position.Right} style={connections} />
    </>
  );
};

export default memo(ColorSelectorNode);
