interface ListaDeCompras {
  id: number;
  league: string;
  home: string;
  away: string;
  date: string;
  estado: string
}

const compras: ListaDeCompras[] = [
  { id: 1, league: 'La liga', home: 'Barcelona FC', away: 'Real Madrid', date: '23-01-2024', estado: 'en proceso a completada correctamente ' },
  { id: 2, league: 'Premiere', home: 'Bornemouth' , away: 'Southampton', date: '25-01-2024', estado: 'en proceso a completada correctamente ' },
  { id: 3, league: 'Futbol Chileno', home: 'Huachipato', away: 'Colo-colo', date: '06-05-2024', estado: 'en proceso a completada correctamente ' },
];

function ProcesoDeCompras() {
  return (
    <div id="compras-container">
      <h1 style={{color: "white", marginBottom: "100px"}}>
        Tus Compras
      </h1>
      <ul>
        {compras.map((compra) => (
          <li key={compra.id} className="compra-item">
            <p><strong>Liga:</strong> {compra.league}</p>
            <p><strong>Local:</strong> {compra.home}</p>
            <p><strong>Visita:</strong> {compra.away}</p>
            <p><strong>Fecha:</strong> {compra.date}</p>
            <p><strong>Estado compra:</strong> {compra.estado}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProcesoDeCompras;
