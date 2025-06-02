import ChatContainer from "../Features/Chat/ChatContainer";
import ChatHeader from "../Features/Chat/ChatHeader";
import styles from "./Chat.module.css";

function Chat() {
  return (
    <>
      <div className={styles.chat}>
        <ChatHeader />
        <ChatContainer />
      </div>
    </>
  );
}

export default Chat;
