import styles from "../../Pages/Chat.module.css";

function UserChat() {
  return (
    <div className={styles.user}>
      <div>
        <img src="../../../public/images/avatar-01.png" alt="avatar" />
        <div>
          <span>سارة عبدالله</span>
          <p>انا حجزت سيشن جديدة </p>
          <p>منذ 12 دقيقة</p>
        </div>
      </div>
      <div>
        <img src="../../../public/images/more.svg" alt="more" />
        <span>5</span>
      </div>
    </div>
  );
}

export default UserChat;
