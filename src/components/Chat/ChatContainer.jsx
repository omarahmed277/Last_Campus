import { Link } from "react-router-dom";
import styles from "../../Pages/Chat.module.css";

function ChatContainer() {
  return (
    <div className={styles.chatContainer}>
      <div className={styles.empaty}>
        <img src="../../../public/images/messages-1.svg" alt="messages" />
        <div>
          <span>ابدأ محادثة جديدة</span>
          <p>ستظهر الرسائل هنا بعد التواصل مع المينتور أو المنتيي.</p>
        </div>
        <Link>
          ابدأ المحادثة{" "}
          <img src="../../../public/images/messages-2.svg" alt="messages" />
        </Link>
      </div>
    </div>
  );
}

export default ChatContainer;
