import { Fixture, OddValue } from '../../types/backend';

export function FixtureCard(
    { fixture, apuestaSeleccionada, bonosSeleccionados, handleApuestaChange, handleBonosChange, handleComprar, findMatchWinnerOdd }
        : {
            fixture: Fixture, apuestaSeleccionada: { [key: number]: string | null }, bonosSeleccionados: Record<number, number>, handleApuestaChange: (id: number, apuesta: string) => void, handleBonosChange: (id: number, bonos: number) => void, handleComprar: (id: number) => void,
            findMatchWinnerOdd: (fixture: Fixture, team: string) => OddValue | null
        }
) {
    return (
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
    )
}