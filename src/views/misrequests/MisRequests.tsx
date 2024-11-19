import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import "./MisRequests.scss";

interface Requests {
  request_id: string;
  league_name: string;
  status: string;
  result: string;
  quantity: number;
  url_boleta: string;
}

const BACKEND_PROTOCOL = import.meta.env.VITE_BACKEND_PROTOCOL as string;
const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST as string;

function MisRequests() {
  const { user } = useAuth0();
  const [requests, setRequests] = useState<Requests[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const ws = new WebSocket(`${BACKEND_PROTOCOL}://${BACKEND_HOST}/requests/${user.sub}`);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      console.log(event);
      const requests = event.data;
      setRequests(JSON.parse(requests));
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
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
    <div id="requests-container" style={{ color: "white", textAlign: "center" }}>
      <h1>Listado de mis Requests</h1>
      {requests.length === 0 ? (
        <p>No tienes requests en este momento.</p>
      ) : (
        <div className="requests-grid">
          {requests.map((request) => (
            <div key={request.request_id} className="compra-item">
              <p><strong>Liga:</strong> {request.league_name}</p>
              <p><strong>Resultado:</strong> {request.result}</p>
              <p><strong>Estado:</strong> {request.status}</p>
              <button onClick={() => handleDescargarBoleta(request.request_id)}>Descargar Boleta</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MisRequests;