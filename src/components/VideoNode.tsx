// ImageNode.tsx

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

interface ImageNodeProps extends NodeProps {
  onDelete: (id: string) => void;
}

const ImageNode: FC<ImageNodeProps> = ({ id, onDelete }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Handle type="target" position={Position.Left} onConnect={onConnect} style={connections}  />
      <div style={labelStyle}>
        {imageUrl ? (
          <>
            <img src={imageUrl} alt="Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            <button
              onClick={() => onDelete(id)} 
              style={{ marginLeft: '5px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              X
            </button>
          </>
        ) : (
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        )}
      </div>
      <Handle type="source" position={Position.Right} style={connections} />
    </>
  );
};

export default memo(ImageNode);
