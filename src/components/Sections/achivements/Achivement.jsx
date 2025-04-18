import styles from "./Achivements.module.css";
function Achivement() {
  return (
    <div class={styles.achievement}>
      <div class={styles.achieve}>
        <img src="./images/Frame 1171278344.png" alt="achievement" />
        <div class={styles.text}>
          <span>1000 دقيقة توجيه </span>
          <p>Online</p>
        </div>
      </div>
      <div class={styles.date}>
        <p>20 Jan, 2025</p>
      </div>
    </div>
  );
}

export default Achivement;
