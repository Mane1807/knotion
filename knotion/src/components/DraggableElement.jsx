import React from 'react';

const DraggableElement = ({ imagenSrc }) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', imagenSrc);
    console.log('Inicio de arrastre:', imagenSrc);
  };

  return (
    <div
      className="draggable-element"
      draggable="true"
      onDragStart={handleDragStart}
    >
      <img src={imagenSrc} alt="Elemento arrastrable" />
    </div>
  );
};

export default DraggableElement;
