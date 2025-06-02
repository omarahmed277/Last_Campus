import Rate from "./Rate";
import styles from "./Rates.module.css";

function Rates({ user }) {
  if (!user) return null;

  const rates = user.rates || [];

  return (
    <div className={styles.rates}>
      {rates.map((rate, i) => (
        <Rate rate={rate} key={i} user={user} />
      ))}
    </div>
  );
}

export default Rates;
