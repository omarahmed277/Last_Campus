import styles from "../../Pages/Chat.module.css";
import UserChat from "./UserChat";

function ChatHeader() {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.title}>
        <span>
          الرسائل الواردة{" "}
          <img src="../../../public/images/arrow-down.svg" alt="arrow" />
        </span>
        <img src="../../../public/images/close-circle.svg" alt="" />
      </div>
      <div className={styles.users}>
        <UserChat />
        <UserChat />
      </div>
    </div>
  );
}

export default ChatHeader;
