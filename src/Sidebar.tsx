import { DragEvent } from 'react';

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};




const Sidebar = () => {
  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      
      <div
        className="react-flow__node-input"
        onDragStart={(event: DragEvent) => onDragStart(event, 'Texto')}
        draggable
      >
        Texto
      </div>
      <div
        className="react-flow__node-default"
        onDragStart={(event: DragEvent) => onDragStart(event, 'Imagem')}
        draggable
      >
        Imagem
      </div>
      <div
        className="react-flow__node-output"
        onDragStart={(event: DragEvent) => onDragStart(event, 'Video')}
        draggable
      >
        Video
      </div>
    </aside>
  );
};

export default Sidebar;
