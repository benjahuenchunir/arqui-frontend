import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

interface Requests {
  request_id: string;
  league_name: string;
  status: string;
  result: string;
  quantity: number;
  url_boleta: string;
}

function MisRequests() {
  const { user } = useAuth0();
  const [requests, setRequests] = useState<Requests[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchRequests = async () => {
      try {
        const response = await axios.get<Requests[]>(`/requests/${user.sub}`);
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    void fetchRequests();
  }, [user]);

  if (!user) {
    return null;
  }

  const handleDescargarBoleta = (requestId: string) => {
    const request = requests.find((r) => r.request_id === requestId);
    if (!request) {
      return
    }
    console.log(request);
    console.log(request.url_boleta);
    window.open(request.url_boleta, '_blank');
  };

  return (
    <div id="requests-container" style={{color: "white", textAlign: "center"}}>
      <h1>Listado de mis Requests</h1>
      {requests.length === 0 ? (
        <p>No tienes requests en este momento.</p>
      ) : (
        <ul>
          {requests.map((request) => (
            <li key={request.request_id} className="compra-item">
              <p><strong>Liga:</strong> {request.league_name}</p>
              <p><strong>Resultado:</strong> {request.result}</p>
              <p><strong>Estado:</strong> {request.status}</p>
              <button onClick={() => handleDescargarBoleta(request.request_id)}>Descargar Boleta</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MisRequests;