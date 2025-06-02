import styles from "../../Pages/Explore.module.css";
function Filter() {
  return (
    <span className={styles.filter}>
      <img src="./public/images/mage_filter.svg" alt="filter" />
      فلتر
    </span>
  );
}

export default Filter;
