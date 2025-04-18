import styles from "./SissionsManagement.module.css";
function UpcomingSession({ session }) {
  const { date, time, trainee, type } = session;

  return (
    <div class={`${styles.session} ${type ? styles[type] : ""}`}>
      <div class={styles.sessionTitle}>
        <p>
          جلسه ارشاديه مع <span>{trainee}</span>
        </p>
        <span class="show-modal-btn next-setion-modal">
          التفاصيل{" "}
          <img src="../../../public/images/arrow-left.svg" alt="left" />
        </span>
      </div>
      <div class={styles.sessionTime}>
        <p>
          {date}
          <img src="../../../public/images/calendar.svg" alt="calendar" />
        </p>
        <p>
          {time}
          <img src="../../../public/images/timer.svg" alt="time" />
        </p>
      </div>
      <div class={styles.sessionsBtns}>
        <button class={styles.accept}>قبول الجلسة</button>
        <button>إرسال رسالة</button>
        <button>تغيير المعاد</button>
        <button class={styles.cancel}>الغاء الجلسة</button>
      </div>
      {/* <div className={styles.mentor}>
        <h2>الموجه :</h2>
        <div>
          <img src="../../../public/images/avatar-01.png" alt="avatar" />
          <div className={styles.text}></div>
        </div>
      </div> */}
    </div>
  );
}

export default UpcomingSession;
