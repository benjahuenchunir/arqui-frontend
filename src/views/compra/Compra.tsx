import '../../index.css';
import { useState } from 'react';

interface Compra {
  id: number;
  league: string;
  home: string;
  away: string;
  date: string;
  bonos: number;  // Número de bonos disponibles
  odds: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };
}

const compras: Compra[] = [
  { id: 1, league: 'La liga', home: 'Barcelona FC', away: 'Real Madrid', date: '23-01-2024', bonos: 10, odds: { homeWin: 1.8, draw: 3.5, awayWin: 2.2 } },
  { id: 2, league: 'Premiere', home: 'Bornemouth', away: 'Southampton', date: '25-01-2024', bonos: 15, odds: { homeWin: 2.1, draw: 3.2, awayWin: 2.4 } },
  { id: 3, league: 'Futbol Chileno', home: 'Huachipato', away: 'Colo-colo', date: '06-05-2024', bonos: 5, odds: { homeWin: 3.0, draw: 3.0, awayWin: 1.7 } },
];

function Compra() {
  const [bonosSeleccionados, setBonosSeleccionados] = useState<{ [key: number]: number }>({});
  const [apuestaSeleccionada, setApuestaSeleccionada] = useState<{ [key: number]: string | null }>({});

  const handleComprar = (id: number) => {
    const cantidadBonos = bonosSeleccionados[id] || 1;  // Valor por defecto
    const apuesta = apuestaSeleccionada[id] || 'Sin apuesta';  // Si no se seleccionó apuesta
    console.log(`Compra realizada para el partido ${id} con ${cantidadBonos} bonos y apuesta: ${apuesta}.`);
  };

  const handleBonosChange = (id: number, value: number) => {
    setBonosSeleccionados((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleApuestaChange = (id: number, apuesta: string) => {
    setApuestaSeleccionada((prevState) => ({
      ...prevState,
      [id]: prevState[id] === apuesta ? null : apuesta,  // Deseleccionar si ya está seleccionado
    }));
  };

  return (
    <div id="compras-container">
      <h1>Compra de Bonos</h1>
      <ul>
        {compras.map((compra) => (
          <li key={compra.id} className="compra-item">
            <p><strong>Liga:</strong> {compra.league}</p>
            <p><strong>Local:</strong> {compra.home}</p>
            <p><strong>Visita:</strong> {compra.away}</p>
            <p><strong>Fecha:</strong> {compra.date}</p>
            <p><strong>Bonos disponibles:</strong> {compra.bonos}</p>

            {/* Odds y botones de apuesta */}
            <div className="apuestas-container">
              <div className="apuesta-item">
                <p><strong>Gana {compra.home}:</strong> {compra.odds.homeWin}</p>
                <button
                  className={apuestaSeleccionada[compra.id] === 'Local' ? 'selected' : ''}
                  onClick={() => handleApuestaChange(compra.id, 'Local')}
                >
                  Gana Local
                </button>
              </div>
              <div className="apuesta-item">
                <p><strong>Empate:</strong> {compra.odds.draw}</p>
                <button
                  className={apuestaSeleccionada[compra.id] === 'Empate' ? 'selected' : ''}
                  onClick={() => handleApuestaChange(compra.id, 'Empate')}
                >
                  Empate
                </button>
              </div>
              <div className="apuesta-item">
                <p><strong>Gana {compra.away}:</strong> {compra.odds.awayWin}</p>
                <button
                  className={apuestaSeleccionada[compra.id] === 'Visita' ? 'selected' : ''}
                  onClick={() => handleApuestaChange(compra.id, 'Visita')}
                >
                  Gana Visita
                </button>
              </div>
            </div>

            {/* Selector de cantidad de bonos */}
            <label htmlFor={`bonos-${compra.id}`}>Selecciona cantidad de bonos (1 a {compra.bonos}):</label>
            <input
              type="number"
              id={`bonos-${compra.id}`}
              name="bonos"
              min="1"
              max={compra.bonos}
              value={bonosSeleccionados[compra.id] || 1}
              onChange={(e) => handleBonosChange(compra.id, parseInt(e.target.value))}
            />

            {/* Botón de compra */}
            <button onClick={() => handleComprar(compra.id)}>Comprar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Compra;