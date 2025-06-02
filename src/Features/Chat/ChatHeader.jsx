import styles from "../../Pages/Chat.module.css";
import UserChat from "./UserChat";
import { useQuery } from "@tanstack/react-query";
import { getAllChats } from "../../services/apiChat";
import { useUserData } from "../../contexts/useUserData";
function ChatHeader() {
  // handle user chats with react query from apiCats
  // const userChats=[]
  const {userChats=[]}=useUserData()
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
        {userChats?.map((chat) => (
          <UserChat key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}

export default ChatHeader;
