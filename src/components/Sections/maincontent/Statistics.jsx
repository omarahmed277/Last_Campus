import styles from "./MainContent.module.css";

function Statistics() {
  return (
    <div className={styles.statistic}>
      <div className={styles.title}>
        <span>إحصائياتي</span>
        <span>
          المزيد
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M19.92 9.4502L13.4 15.9702C12.63 16.7402 11.37 16.7402 10.6 15.9702L4.07996 9.4502"
              stroke="#777777"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
      <div>
        <div>
          <img src="images/gallery-04.png" alt="gallery" />
          <div>
            <span>2,200 دقيقة</span>
            <p>إجمالي وقت الإرشاد</p>
          </div>
        </div>
        <div>
          <img src="images/gallery-04.png" alt="gallery" />
          <div>
            <span>70</span>
            <p>الجلسات المكتملة</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
