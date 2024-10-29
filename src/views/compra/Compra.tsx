import '../../index.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useModal } from '../../components/Modal/ModalContext';
import './Compra.scss';
import { Fixture, OddValue } from '../../types/backend.ts';
import { FixtureCard } from './FixtureCard.tsx';

interface Request {
  fixture_id: number;
  result: string;
  quantity: number;
  uid: string;
}

interface ResponseData {
  url?: string;
  token?: string;
  amount?: number;
  price?: number;
}

interface RecommendedData {
  fixtures: Fixture[];
  last_updated: Date;
}

function Compra() {
  const { user, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [bonosSeleccionados, setBonosSeleccionados] = useState<{ [key: number]: number }>({});
  const [apuestaSeleccionada, setApuestaSeleccionada] = useState<{ [key: number]: string | null }>({});
  const [filteredFixtures, setFilteredFixtures] = useState<Fixture[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [page, setPage] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'webpay'>('webpay');
  const fixturesPerPage = 10;
  const { showModal } = useModal();
  const [recomendationStatus, setRecomendationStatus] = useState<boolean>(false);
  const [lastRecommendationCalculation, setLastRecommendationCalculation] = useState<Date | null>(null);
  const [recommendedFixtures, setRecommendedFixtures] = useState<Fixture[]>([]);

  useEffect(() => {
    const fetchRecommendedFixtures = async () => {
      try {
        const response = await axios.get<RecommendedData>(`/fixtures/recommended/${user?.sub}`);
        setRecommendedFixtures(response.data.fixtures);
        setLastRecommendationCalculation(response.data.last_updated);
      } catch (error) {
        console.error('Error fetching recommended fixtures:', error);
      }
    };
    void fetchRecommendedFixtures();
  }, [])

  useEffect(() => {
    const fetchRecomendationStatus = async () => {
      try {
        const response = await axios.get<boolean>('/jobs_master/heartbeat');
        setRecomendationStatus(response.data);
      } catch (error) {
        console.error('Error fetching recomendation status:', error);
      }
    };
    void fetchRecomendationStatus();
  }, []);

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

    const fixture: Fixture | undefined = fixtures.find(f => f.id === id);
    if (!fixture) {
      console.error('Fixture no encontrado.');
      return;
    }

    let result: string;
    if (apuesta === 'Local') {
      result = fixture ? fixture.home_team.team.name : 'error';
    } else if (apuesta === 'Visita') {
      result = fixture ? fixture.away_team.team.name : 'error';
    } else if (apuesta === 'Empate') {
      result = '---';
    } else {
      console.error('Apuesta no seleccionada.');
      return
    }

    const requestData: Request = {
      fixture_id: id,
      result: result,
      quantity: cantidadBonos,
      uid: user.sub || 'error',
    };

    try {
      if (paymentMethod === 'webpay') {
        const response: AxiosResponse<ResponseData> = await axios.post("/requests/webpay", requestData);
        console.log('Compra realizada:', response.data);
        const data = response.data;

        if (data?.url && data?.token) {
          navigate(`/confirm-purchase`, {
            state: {
              url: data.url,
              token: data.token,
              amount: data.amount,
              title: fixture?.home_team.team.name + ' vs ' + fixture?.away_team.team.name + ' - ' + fixture?.league.name || 'Unknown',
              price: data.price,
            }
          })
        } else {
          console.error("Missing url or token")
        }
      } else if (paymentMethod === 'wallet') {
        await axios.post("/requests/wallet", requestData);
        showModal('Compra realizada con éxito', 'success');
      }

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
      [id]: prevState[id] === apuesta ? null : apuesta,
    }));
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value as 'webpay' | 'wallet');
  };

  const handleComprarWrapper = (id: number) => {
    void handleComprar(id);
  };

  return (
    <div id="compras-container" style={{ color: "white" }}>
      <h1 style={{ marginBottom: "50px" }}>Compra de Bonos</h1>
      <div>
        <label htmlFor="paymentMethod" style={{ marginRight: "20px", marginBottom: "50px" }}>Método de pago:</label>
        <select id="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange}>
          <option value="webpay">Webpay</option>
          <option value="wallet">Wallet</option>
        </select>
      </div>

      <div id='recommended-container'>
        <h2>Partidos recomendados</h2>
        <div className='info-container'>
          <p>Status sistema: {recomendationStatus ? 'Activo' : 'Inactivo'}</p>
          <p>Calculado el {lastRecommendationCalculation?.toLocaleString()}</p>
        </div>
        <div className='fixtures-container'>
          {recommendedFixtures.length === 0 && <p>No hay partidos recomendados en este momento.</p>}
          {recommendedFixtures.map((fixture) => (
            <FixtureCard
              key={fixture.id}
              fixture={fixture}
              apuestaSeleccionada={apuestaSeleccionada}
              bonosSeleccionados={bonosSeleccionados}
              handleApuestaChange={handleApuestaChange}
              handleBonosChange={handleBonosChange}
              handleComprar={handleComprarWrapper}
              findMatchWinnerOdd={findMatchWinnerOdd}
            />
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="dateFilter" style={{ marginRight: "20px", marginBottom: "50px" }}>Filtrar por fecha:</label>
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
              <FixtureCard
                key={fixture.id}
                fixture={fixture}
                apuestaSeleccionada={apuestaSeleccionada}
                bonosSeleccionados={bonosSeleccionados}
                handleApuestaChange={handleApuestaChange}
                handleBonosChange={handleBonosChange}
                handleComprar={handleComprarWrapper}
                findMatchWinnerOdd={findMatchWinnerOdd}
              />
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