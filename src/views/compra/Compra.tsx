import { useState } from 'react';

interface Compra {
  id: number;
  league: string;
  home: string;
  away: string;
  date: string;
  bonos: number;  // Número de bonos disponibles
}

const compras: Compra[] = [
  { id: 1, league: 'La liga', home: 'Barcelona FC', away: 'Real Madrid', date: '23-01-2024', bonos: 10 },
  { id: 2, league: 'Premiere', home: 'Bornemouth', away: 'Southampton', date: '25-01-2024', bonos: 15 },
  { id: 3, league: 'Futbol Chileno', home: 'Huachipato', away: 'Colo-colo', date: '06-05-2024', bonos: 5 },
];

function Compra() {
  const [bonosSeleccionados, setBonosSeleccionados] = useState<{ [key: number]: number }>({});

  const handleComprar = (id: number) => {
    const cantidadBonos = bonosSeleccionados[id] || 1;  // Valor por defecto
    console.log(`Compra realizada para el partido ${id} con ${cantidadBonos} bonos.`);
    // Agregar lógica después
  };

  const handleBonosChange = (id: number, value: number) => {
    setBonosSeleccionados((prevState) => ({
      ...prevState,
      [id]: value,
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

            {/* Selector de cantidad de bonos */}
            <label htmlFor={`bonos-${compra.id}`}>Selecciona cantidad de bonos (1 a {compra.bonos}):</label>
            <input
              type="number"
              id={`bonos-${compra.id}`}
              name="bonos"
              min="1"
              max={compra.bonos}  // Máximo al número de bonos disponibles, ver lógica después
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