import ChatContainer from "../components/Chat/ChatContainer";
import ChatHeader from "../components/Chat/ChatHeader";
import NavBar from "../components/NavBar/NavBar";
import styles from "./Chat.module.css";

function Chat({ curAcount }) {
  return (
    <div className={styles.container}>
      <NavBar user={curAcount} />
      <div className={styles.chat}>
        <ChatHeader />
        <ChatContainer />
      </div>
    </div>
  );
}

export default Chat;
