import { useState } from 'react';

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
    <div id="wallet-container">
      <h1>Tu Wallet</h1>
      <p>Aquí podrás ver el balance de tu wallet y gestionar tus fondos.</p>
      
      <div className="wallet-balance">
        <h2>Balance Actual:</h2>
        <p>$0.00</p> {/* Ver lógica después aquí*/}
      </div>

      <div className="wallet-actions">
        <button onClick={handleAgregarFondos}>Agregar Fondos</button>
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
  );
}

export default Wallet;
