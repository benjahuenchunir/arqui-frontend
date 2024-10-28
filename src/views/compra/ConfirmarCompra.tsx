import './ConfirmarCompra.scss';
import { useLocation } from 'react-router-dom';

type State = {
  url: string;
  token: string;
  amount: number;
  title: string;
  price: number;
}

function ConfirmPurchase() {
  const location = useLocation();
  const data = location.state as State;

  console.log(data);
  return (
    <div className="confirmar-compra-container">
      <p className="title">Confirmar Compra</p>
      <form className="form" action={data.url} method="POST">
        <input className="hidden-input" type="hidden" name="token_ws" value={data.token} />
        <div className="details">
          <p className="detail-title">{data.title}</p>
          <p className="detail-item">Cantidad: {data.amount}</p>
        </div>
        <button className="submit-button" type="submit">Pagar ${data.price * data.amount}</button>
      </form>
    </div>
  );
}

export default ConfirmPurchase;