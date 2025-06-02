import styles from "./search.module.css";
function search({ query, setQuery }) {
  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="البحث حسب الاسم و الشركة و الدور "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default search;
