import React from 'react';

interface OfferCardProps {
  league: string;
  round: string;
  result: string;
  quantity: number;
  groupId: string | number;
  onComprar: (groupId: string | number) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ league, round, result, quantity, groupId, onComprar }) => {
  return (
    <div className="offer-card">
      <h3>{league}</h3>
      <p>Round: {round}</p>
      <p>Result: {result}</p>
      <p>Quantity: {quantity}</p>
      <button onClick={() => onComprar(groupId)}>Comprar</button>
    </div>
  );
};

export default OfferCard;