import { useState } from 'react';
import { Fade } from '@mui/material';

function Wallet() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cantidadFondos, setCantidadFondos] = useState(0);

  const handleAgregarFondos = () => {
    setMostrarModal(true);  // Mostrar el modal
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);  // Cerrar el modal
  };

  const handleConfirmarFondos = () => {
    console.log(`Fondos agregados: $${cantidadFondos}`);
    setMostrarModal(false);  // Cerrar el modal después de confirmar
    // Aquí se agrega la lógica después
  };

  return (
    <Fade in={true} timeout={1000}>
      <div id="wallet-container" style = {{color: "white", textAlign: "center"}}>
        <h1 style={{marginTop: "10px", marginBottom: "180px", fontWeight: 700, color: "#B1CDEC"}}>Tu Wallet</h1>
        <div style = {{ backgroundColor: "#093660", maxWidth: "20%", padding: "20px 20px", borderRadius: "20px", border: "2px solid white", margin: "0 auto" }}>
          <div className="wallet-balance">
            <h2>Balance Actual:</h2>
            <h4 style={{marginBottom: "50px"}}>$0.00</h4> {/* Ver lógica después aquí*/}
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
                <button onClick={handleConfirmarFondos}>OK</button>
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