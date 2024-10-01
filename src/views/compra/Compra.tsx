import '../../index.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

interface Fixture {
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

const BACKEND_PROTOCOL = import.meta.env.VITE_BACKEND_PROTOCOL as string;
const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST as string;

function Compra() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [bonosSeleccionados, setBonosSeleccionados] = useState<{ [key: number]: number }>({});
  const [apuestaSeleccionada, setApuestaSeleccionada] = useState<{ [key: number]: string | null }>({});

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get<Fixture[]>(`${BACKEND_PROTOCOL}://${BACKEND_HOST}/fixtures/available`);
        setFixtures(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    void fetchRequests();
  });

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
        {fixtures.map((fixtures) => (
          <li key={fixtures.id} className="compra-item">
            <p><strong>Liga:</strong> {fixtures.league}</p>
            <p><strong>Local:</strong> {fixtures.home}</p>
            <p><strong>Visita:</strong> {fixtures.away}</p>
            <p><strong>Fecha:</strong> {fixtures.date}</p>
            <p><strong>Bonos disponibles:</strong> {fixtures.bonos}</p>

            {/* Odds y botones de apuesta */}
            <div className="apuestas-container">
              <div className="apuesta-item">
                <p><strong>Gana {fixtures.home}:</strong> {fixtures.odds.homeWin}</p>
                <button
                  className={apuestaSeleccionada[fixtures.id] === 'Local' ? 'selected' : ''}
                  onClick={() => handleApuestaChange(fixtures.id, 'Local')}
                >
                  Gana Local
                </button>
              </div>
              <div className="apuesta-item">
                <p><strong>Empate:</strong> {fixtures.odds.draw}</p>
                <button
                  className={apuestaSeleccionada[fixtures.id] === 'Empate' ? 'selected' : ''}
                  onClick={() => handleApuestaChange(fixtures.id, 'Empate')}
                >
                  Empate
                </button>
              </div>
              <div className="apuesta-item">
                <p><strong>Gana {fixtures.away}:</strong> {fixtures.odds.awayWin}</p>
                <button
                  className={apuestaSeleccionada[fixtures.id] === 'Visita' ? 'selected' : ''}
                  onClick={() => handleApuestaChange(fixtures.id, 'Visita')}
                >
                  Gana Visita
                </button>
              </div>
            </div>

            {/* Selector de cantidad de bonos */}
            <label htmlFor={`bonos-${fixtures.id}`}>Selecciona cantidad de bonos (1 a {fixtures.bonos}):</label>
            <input
              type="number"
              id={`bonos-${fixtures.id}`}
              name="bonos"
              min="1"
              max={fixtures.bonos}
              value={bonosSeleccionados[fixtures.id] || 1}
              onChange={(e) => handleBonosChange(fixtures.id, parseInt(e.target.value))}
            />

            {/* Botón de compra */}
            <button onClick={() => handleComprar(fixtures.id)}>Comprar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Compra;