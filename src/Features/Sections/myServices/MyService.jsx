import styles from "./MyServices.module.css";

function MyService() {
  return (
    <div className={styles.service}>
      <div>
        <span>Flutter-Career Coaching</span>
        <img src="/public/images/setting-2.svg" alt="setting" />
      </div>
      <p>30 minutes - عامة</p>
      <p>
        <img src="/public/images/meet.svg" alt="meet" />
        Google Meet
      </p>
      <div>
        <span>
          <img src="/public/images/document-copy.svg" alt="document" />
          نسخ الرابط
        </span>
        <span>
          <img src="/public/images/uil_share.svg" alt="share" />
          مشاركة
        </span>
      </div>
    </div>
  );
}

export default MyService;
