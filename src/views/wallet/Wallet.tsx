import { useState } from 'react';
import { Fade } from '@mui/material';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import './Wallet.scss';

function Wallet() {
  const { user } = useAuth0();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cantidadFondos, setCantidadFondos] = useState(0);
  const [balance, setBalance] = useState(0); // New state for balance

  if (!user) {
    return null;
  }

  const handleAgregarFondos = () => {
    setMostrarModal(true);  // Mostrar el modal
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);  // Cerrar el modal
  };

  const handleConfirmarFondos = async () => {
    try {
      const response = await axios.patch("/wallet", { uid: user.sub, amount: cantidadFondos });
      console.log(response.data);
      setBalance(balance + cantidadFondos); // Update balance
      setMostrarModal(false);  // Cerrar el modal después de confirmar
    } catch (error) {
      console.error('Error adding funds:', error);
    }
  };

  return (
        <Fade in={true} timeout={1000}>
      <div id="wallet-container" style={{ color: "white", textAlign: "center" }}>
        <h1 style={{ marginTop: "10px", marginBottom: "180px", fontWeight: 700, color: "#B1CDEC" }}>Tu Wallet</h1>
        <div style={{ backgroundColor: "#093660", maxWidth: "20%", padding: "20px 20px", borderRadius: "20px", border: "2px solid white", margin: "0 auto" }}>
          <div className="wallet-balance">
            <h2>Balance Actual:</h2>
            <h4 style={{ marginBottom: "50px" }}>${balance.toFixed(2)}</h4> {/* Updated balance display */}
          </div>
    
          <div className="wallet-actions">
            <button onClick={handleAgregarFondos}>Agregar Fondos</button>
          </div>
        </div>
    
        {/* Modal para agregar fondos */}
        {mostrarModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Agregar Fondos</h2>
              <label htmlFor="cantidad-fondos">Ingresa la cantidad:</label>
              <input
                type="number"
                id="cantidad-fondos"
                value={cantidadFondos}
                onChange={(e) => setCantidadFondos(Number(e.target.value))}
                min="1"
              />
              <div className="modal-actions">
                <button onClick={() => { void handleConfirmarFondos(); }}>OK</button> {/* Explicitly ignoring the promise */}
                <button onClick={handleCerrarModal}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fade>
  );
}

export default Wallet;