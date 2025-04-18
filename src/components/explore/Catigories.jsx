import styles from "./Catigories.module.css";

function Catigories() {
  return (
    <div className={styles.catigories}>
      <img src="../../../public/images/arrow-circle-right.svg" alt="right" />
      <div>
        <span className={styles.active}>الكل</span>
        <span>البرمجة</span>
        <span>البرمجة</span>
        <span>البرمجة</span>
        <span>البرمجة</span>
        <span>البرمجة</span>
        <span>البرمجة</span>
        <span>البرمجة</span>
        <span>البرمجة</span>
        <span>البرمجة</span>
        <span>البرمجة</span>
      </div>
      <img src="../../../public/images/arrow-circle-left.svg" alt="left" />
    </div>
  );
}

export default Catigories;
