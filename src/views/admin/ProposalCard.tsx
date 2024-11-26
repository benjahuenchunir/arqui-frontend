import React from 'react';

interface OfferCardProps {
  league: string;
  round: string;
  result: string;
  quantity: number;
  proposalId: string | number;
  onAccept: (groupId: string | number) => void;
  onReject: (groupId: string | number) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ league, round, result, quantity, proposalId, onAccept, onReject }) => {
  return (
    <div className="offer-card">
      <h3>{league}</h3>
      <p>Round: {round}</p>
      <p>Result: {result}</p>
      <p>Quantity: {quantity}</p>
      <button onClick={() => onAccept(proposalId)}>Aceptar</button>
      <button onClick={() => onReject(proposalId)}>Rechazar</button>
    </div>
  );
};

export default OfferCard;