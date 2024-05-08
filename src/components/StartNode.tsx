import React from 'react';
import { Handle, Position, NodeProps } from 'react-flow-renderer';
import startIcon from '../assets/play.svg';

const StartNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={startIcon} alt="Start" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
        <div>
          <div style={{ fontSize: '20px', color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Início do Fluxo</div>
        </div>
      </div>
      <div style={{ fontSize: '14px', color: '#fff', textAlign: 'center', marginTop: '50px' }}>
        Esse é o início do fluxo, ele pode ser iniciado através das suas campanhas ou gatilhos.
      </div>
      <Handle type="source" position={Position.Right} style={{ background: '#fff', marginTop: '10px' }} />
    </div>
  );
};

export default StartNode;
