import React from 'react';

const EndScreen = ({ score, restartGame }) => (
  <div className="end-screen">
    <h2>Juego terminado</h2>
    <p>Calificación obtenida: {score}</p>
    <button onClick={restartGame}>Reiniciar</button>
  </div>
);

export default EndScreen;
