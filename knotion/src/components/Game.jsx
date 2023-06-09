import React, { useState, useEffect } from 'react';
import DraggableElement from './DraggableElement';
import DroppableContainer from './DroppableContainer';

import img01 from '../assets/drags/img01.png';
import img02 from '../assets/drags/img02.png';
import img03 from '../assets/drags/img03.png';
import img04 from '../assets/drags/img04.png';
import reinicio from '../assets/reinicio/reinicio.png';

function shuffleArray(array) {
  return array.map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.value);
}

const Game = () => {
  const [puntuacion, setPuntuacion] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [elementosArrastrables, setElementosArrastrables] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [elementosSoltados, setElementosSoltados] = useState([]);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mostrarMensajeAgradecimiento, setMostrarMensajeAgradecimiento] = useState(false);

  useEffect(() => {
    reiniciarJuego();
  }, []);

  const manejarSoltar = (elementoSoltadoId, elementoEsperado) => {
    if (elementosSoltados.includes(elementoEsperado)) {
      setMensaje('Ya has colocado esa imagen.');
      return;
    }

    if (elementoSoltadoId === elementoEsperado) {
      const nuevaPuntuacion = puntuacion + (10 / elementosArrastrables.length);
      setPuntuacion(nuevaPuntuacion);
      setElementosSoltados([...elementosSoltados, elementoEsperado]);

      if (nuevaPuntuacion === 10) {
        setTimeout(() => {
          setJuegoTerminado(true);
        }, 3000);
      }

      setMensaje('¡Correcto!');
    } else {
      setMensaje('¡Incorrecto!');
    }
  };

  const reiniciarJuego = () => {
    setPuntuacion(0);
    setJuegoTerminado(false);
    setMensaje('');
    setElementosSoltados([]);
    setMostrarConfirmacion(false);
    setMostrarMensajeAgradecimiento(false);

    const elementosAleatorios = shuffleArray([img01, img02, img03, img04]);
    setElementosArrastrables(elementosAleatorios);
  };

  const progreso = (puntuacion / 10) * 100;

  const manejarConfirmacionReinicio = (reiniciar) => {
    if (reiniciar) {
      reiniciarJuego();
    } else {
      setMostrarConfirmacion(false);
      setMostrarMensajeAgradecimiento(true);
    }
  };

  return (
    <div className="game-container">
      <h1>Knotion</h1>
      {!juegoTerminado ? (
        <div className="game">
          <div className="droppable-containers">
            <DroppableContainer
              elementoEsperado={img01}
              onDrop={manejarSoltar}
              elementosSoltados={elementosSoltados}
            />
            <DroppableContainer
              elementoEsperado={img02}
              onDrop={manejarSoltar}
              elementosSoltados={elementosSoltados}
            />
            <DroppableContainer
              elementoEsperado={img03}
              onDrop={manejarSoltar}
              elementosSoltados={elementosSoltados}
            />
            <DroppableContainer
              elementoEsperado={img04}
              onDrop={manejarSoltar}
              elementosSoltados={elementosSoltados}
            />
          </div>
          <div className="draggable-elements">
            {elementosArrastrables.map((elemento) => (
              <DraggableElement key={elemento} imagenSrc={elemento} />
            ))}
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progreso}%` }} />
          </div>
          <div className="message">{mensaje}</div>
        </div>
      ) : (
        <div className="end-screen">
          {mostrarConfirmacion ? (
            <>
              <h2>¿Deseas reiniciar el juego?</h2>
              <button className="btn btn-primary" onClick={() => manejarConfirmacionReinicio(true)}>
                Sí
              </button>
              <button className="btn btn-danger" onClick={() => manejarConfirmacionReinicio(false)}>
                No
              </button>
            </>
          ) : (
            <>
              <h2>Juego Terminado</h2>
              <p>Tu puntuación es: {Math.floor(puntuacion)}</p>
              <img
                className="reinicio-image"
                src={reinicio}
                alt="Reinicio"
                onClick={() => setMostrarConfirmacion(true)}
              />
            </>
          )}
          {mostrarMensajeAgradecimiento && <h2>Gracias por jugar</h2>}
        </div>
      )}
    </div>
  );
};

export default Game;
