import "./Comprar.scss"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import OfferCard from './OfferCard';

interface Offer {
  league_name: string;
  round: string;
  result: string;
  quantity: number;
  group_id: string | number;
}

const Comprar = () => {
  const { user } = useAuth0();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`/auctions/offers?user_id=${user?.sub}`);
        setOffers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch offers');
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="offers-container">
      {offers.map((offer) => (
        <OfferCard
          key={`${offer.group_id}-${offer.round}`}
          league={offer.league_name}
          round={offer.round}
          result={offer.result}
          quantity={offer.quantity}
          groupId={offer.group_id}
          onComprar={console.log}
        />
      ))}
    </div>
  );
};

export default Comprar;