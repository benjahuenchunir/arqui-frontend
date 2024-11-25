import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import ProposalCard from './ProposalCard';

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
        const response = await axios.get(`/auctions/proposals?user_id=${user?.sub}`);
        setOffers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch offers');
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const onAccept = (groupId: string | number) => {
    console.log(`Accepting proposal for group ${groupId}`);
    }

    const onReject = (groupId: string | number) => {
    console.log(`Rejecting proposal for group ${groupId}`);
    }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="offers-container">
      {offers.map((offer) => (
        <ProposalCard
          key={`${offer.group_id}-${offer.round}`}
          league={offer.league_name}
          round={offer.round}
          result={offer.result}
          quantity={offer.quantity}
          groupId={offer.group_id}
          onAccept={(group_id) => void onAccept(group_id)}
          onReject={(group_id) => void onReject(group_id)}
        />
      ))}
    </div>
  );
};

export default Comprar;