import React from 'react';

interface OfferCardProps {
  league: string;
  round: string;
  result: string;
  quantity: number;
  groupId: string | number;
  onAccept: (groupId: string | number) => void;
  onReject: (groupId: string | number) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ league, round, result, quantity, groupId, onAccept, onReject }) => {
  return (
    <div className="offer-card">
      <h3>{league}</h3>
      <p>Round: {round}</p>
      <p>Result: {result}</p>
      <p>Quantity: {quantity}</p>
      <button onClick={() => onAccept(groupId)}>Aceptar</button>
      <button onClick={() => onReject(groupId)}>Rechazar</button>
    </div>
  );
};

export default OfferCard;