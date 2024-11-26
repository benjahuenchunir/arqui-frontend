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
  proposal_id: string | number;
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

  const onAccept = async (proposal_id: string | number) => {
    try {
      const body = {
        user_id: user?.sub,
        proposal_id: proposal_id
      };
      await axios.post(`/auctions/accept`, body);
    } catch (err) {
      setError('Failed to accept proposal');
    }
  };

  const onReject = async (proposal_id: string | number) => {
    try {
      const body = {
        user_id: user?.sub,
        proposal_id: proposal_id
      };
      await axios.post(`/auctions/reject`, body);
    } catch (err) {
      setError('Failed to reject proposal');
    }
  };

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
          proposalId={offer.proposal_id}
          onAccept={(proposalId) => void onAccept(proposalId)}
          onReject={(proposalId) => void onReject(proposalId)}
        />
      ))}
    </div>
  );
};

export default Comprar;