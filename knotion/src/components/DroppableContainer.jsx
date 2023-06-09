import React, { useState } from 'react';

const DroppableContainer = ({ elementoEsperado, onDrop }) => {
  const [elementoSoltado, setElementoSoltado] = useState(null);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const elementoSoltadoId = event.dataTransfer.getData('text/plain');
    setElementoSoltado(elementoSoltadoId);
    onDrop(elementoSoltadoId, elementoEsperado);
  };

  const containerClassName = `droppable-container${elementoSoltado === elementoEsperado ? ' dropped' : ''}`;

  return (
    <div
      className={containerClassName}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {elementoSoltado === elementoEsperado && <img src={elementoEsperado} alt="Elemento soltado" />}
    </div>
  );
};

export default DroppableContainer;
