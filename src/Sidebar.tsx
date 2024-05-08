import { DragEvent } from 'react';

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};




const Sidebar = () => {
  return (
    <aside>
      <div className="category">
        Mensagens
      </div>
      
      <div
        className="react-flow__node-output"
        onDragStart={(event: DragEvent) => onDragStart(event, 'text')}
        draggable
      >
        Text
      </div>
      <div
        className="react-flow__node-output"
        onDragStart={(event: DragEvent) => onDragStart(event, 'image')}
        draggable
      >
        Image
      </div>
      <div
        className="react-flow__node-output"
        onDragStart={(event: DragEvent) => onDragStart(event, 'video')}
        draggable
      >
        Video
      </div>
      <div
        className="react-flow__node-output"
        onDragStart={(event: DragEvent) => onDragStart(event, 'video')}
        draggable
      >
        Link
      </div>
      <div
        className="react-flow__node-output"
        onDragStart={(event: DragEvent) => onDragStart(event, 'video')}
        draggable
      >
        Document
      </div>
      <div
        className="react-flow__node-output"
        onDragStart={(event: DragEvent) => onDragStart(event, 'video')}
        draggable
      >
        Audio
      </div>

      <div className="category">
        Inputs
      </div>

      <div
        className="react-flow__node-output"
        onDragStart={(event: DragEvent) => onDragStart(event, 'video')}
        draggable
      > 
        questions
      </div>

     
      
    </aside>
  );
};

export default Sidebar;
