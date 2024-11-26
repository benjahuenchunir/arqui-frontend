import "./Comprar.scss"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import OfferCard from './OfferCard';
import { useNavigate } from "react-router-dom";

interface Offer {
  league_name: string;
  round: string;
  result: string;
  quantity: number;
  group_id: string | number;
  auction_id: string | number;
}

const Comprar = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();
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

  const onComprar = (auction_id: string | number) => {
    navigate(`/admin/ofrecer?auction_id=${auction_id}`);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="offers-container">
      {offers.map((offer) => (
        <OfferCard
          key={`${offer.group_id}-${offer.auction_id}`}
          league={offer.league_name}
          round={offer.round}
          result={offer.result}
          quantity={offer.quantity}
          auction_id={offer.auction_id}
          onComprar={onComprar}
        />
      ))}
    </div>
  );
};

export default Comprar;