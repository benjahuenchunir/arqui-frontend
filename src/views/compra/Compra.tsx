import '../../index.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

interface Team {
  id: number;
  name: string;
  logo_url: string;
}

interface TeamGoals {
  goals: number | null;
  team: Team;
}

interface League {
  id: number;
  name: string;
  country: string;
  logo_url: string;
  flag_url: string;
  season: number;
  round: string;
}

interface OddValue {
  id: number;
  value: number;
  bet: string;
}

interface Odd {
  id: number;
  name: string;
  values: OddValue[];
}

interface Fixture {
  id: number;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  status_long: string;
  status_short: string;
  status_elapsed: number | null;
  home_team: TeamGoals;
  away_team: TeamGoals;
  league: League;
  odds: Odd[];
  remaining_bets: number;
}

interface Request {
  fixture_id: number;
  result: string;
  quantity: number;
  uid: string;
}

function Compra() {
  const { user, loginWithRedirect } = useAuth0();
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [bonosSeleccionados, setBonosSeleccionados] = useState<{ [key: number]: number }>({});
  const [apuestaSeleccionada, setApuestaSeleccionada] = useState<{ [key: number]: string | null }>({});
  const [filteredFixtures, setFilteredFixtures] = useState<Fixture[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [page, setPage] = useState(0);
  const fixturesPerPage = 10;

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await axios.get<Fixture[]>(`/fixtures/available?page=${page}&count=${fixturesPerPage}`);
        if (response.data.length === 0 && page > 0) {
            setPage(page - 1)
            return;
        }
        setFixtures(response.data);
        setFilteredFixtures(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
    void fetchFixtures();
  }, [page]);

    // Filtrar por fecha
    const handleDateFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selected = event.target.value;
      setSelectedDate(selected);
      if (selected) {
        setFilteredFixtures(fixtures.filter(fixture => fixture.date.includes(selected)));
      } else {
        setFilteredFixtures(fixtures);
      }
    };
  
  const findMatchWinnerOdd = (fixture: Fixture, team: string): OddValue | null => {
    const odd = fixture.odds.find((odd) => odd.name === 'Match Winner');
    return odd?.values.find((value) => value.bet === team) || null;
  }

  const handleComprar = async (id: number) => {
    if (!user) {
      await loginWithRedirect();
      return;
    }

    const cantidadBonos = bonosSeleccionados[id] || 1;
    const apuesta = apuestaSeleccionada[id];

    let result: string;
    if (apuesta === 'Local') {
      const fixture = fixtures.find(f => f.id === id);
      result = fixture ? fixture.home_team.team.name : 'error';
    } else if (apuesta === 'Visita') {
      const fixture = fixtures.find(f => f.id === id);
      result = fixture ? fixture.away_team.team.name : 'error';
    } else if (apuesta === 'Empate') {
      result = '---';
    } else {
      result = 'Sin apuesta';
    }

    const requestData: Request = {
      fixture_id: id,
      result: result,
      quantity: cantidadBonos,
      uid: user.sub || 'error',
    };

    try {
      const response = await axios.post("/requests", requestData);
      console.log('Compra realizada:', response.data);
    } catch (error) {
      console.error('Error realizando la compra:', error);
    }
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
    <div id="compras-container" style={{color: "white"}}>
      <h1 style={{marginBottom: "50px"}}>Compra de Bonos</h1>
      <div>
        <label htmlFor="dateFilter" style={{marginRight: "20px", marginBottom: "50px"}}>Filtrar por fecha:</label>
        <input
          type="date"
          id="dateFilter"
          value={selectedDate}
          onChange={handleDateFilter}
        />
      </div>

      
      {filteredFixtures.length === 0 ? (
        <p>No hay fixtures disponibles en este momento.</p>
      ) : (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {fixtures.map((fixture) => (
              <div key={fixture.id} className="compra-item">
                <p><strong>Liga:</strong> {fixture.league.name}</p>
                <p><strong>Local:</strong> {fixture.home_team.team.name}</p>
                <p><strong>Visita:</strong> {fixture.away_team.team.name}</p>
                <p><strong>Referee:</strong> {fixture.referee}</p>
                <p><strong>Fecha:</strong> {fixture.date}</p>
                <p><strong>Bonos disponibles:</strong> {fixture.remaining_bets}</p>

                <div className="apuestas-container">
                  <div className="apuesta-item">
                    <p><strong>Gana {fixture.home_team.team.name}:</strong> {findMatchWinnerOdd(fixture, 'Home')?.value}</p>
                    <button
                      className={apuestaSeleccionada[fixture.id] === 'Local' ? 'selected' : ''}
                      onClick={() => handleApuestaChange(fixture.id, 'Local')}
                    >
                      Gana Local
                    </button>
                  </div>
                  <div className="apuesta-item">
                    <p><strong>Empate:</strong> {findMatchWinnerOdd(fixture, 'Draw')?.value}</p>
                    <button
                      className={apuestaSeleccionada[fixture.id] === 'Empate' ? 'selected' : ''}
                      onClick={() => handleApuestaChange(fixture.id, 'Empate')}
                    >
                      Empate
                    </button>
                  </div>
                  <div className="apuesta-item">
                    <p><strong>Gana {fixture.away_team.team.name}:</strong> {findMatchWinnerOdd(fixture, 'Away')?.value}</p>
                    <button
                      className={apuestaSeleccionada[fixture.id] === 'Visita' ? 'selected' : ''}
                      onClick={() => handleApuestaChange(fixture.id, 'Visita')}
                    >
                      Gana Visita
                    </button>
                  </div>
                </div>

                <label htmlFor={`bonos-${fixture.id}`}>Selecciona cantidad de bonos (1 a {fixture.remaining_bets}):</label>
                <input
                  type="number"
                  id={`bonos-${fixture.id}`}
                  name="bonos"
                  min="1"
                  max={fixture.remaining_bets}
                  value={bonosSeleccionados[fixture.id] || 1}
                  onChange={(e) => handleBonosChange(fixture.id, parseInt(e.target.value))}
                />

                <button onClick={() => void handleComprar(fixture.id)}>Comprar</button>
              </div>
            ))}
          </div>

          <div>
            {page > 0 && (
              <button onClick={() => setPage(page - 1)}>Prev</button>
            )}
            <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Compra;