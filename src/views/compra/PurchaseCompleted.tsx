import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import styles from "./PurchaseCompleted.module.scss";

interface CommitTransactionResponse {
  approved: boolean;
}

async function commitTransaction({ token }: { token: string }): Promise<CommitTransactionResponse> {
  console.log("commitTransaction", token);
  const response = await axios.post<CommitTransactionResponse>("/requests/commit-transaction", {
    token: token
  });
  return response.data;
}

function PurchaseCompleted() {
  const [searchParams] = useSearchParams();

  const { data, isLoading } = useQuery<CommitTransactionResponse>({
    queryKey: ['completed-purchase'],
    queryFn: () => commitTransaction({ token: searchParams.get('token_ws') || searchParams.get('TBK_TOKEN') || '' }),
  });

  if (isLoading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Loading...</h1>
      </div>
    );
  }

  console.log(data);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Compra finalizada</h1>
      {
        data?.approved
          ? <p className={styles.paragraph}>La compra fue realizada con éxito</p>
          : <p className={styles.paragraph}>La compra fue rechazada</p>
      }
      <Link to="/" className={styles.link}>Volver a inicio</Link>
    </div>
  );
}

export default PurchaseCompleted;