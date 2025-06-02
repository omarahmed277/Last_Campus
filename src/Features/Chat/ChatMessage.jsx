import styles from "../../Pages/Chat.module.css";
import { useUserData } from "../../contexts/useUserData";
function ChatMessage({message}) {
  const {currentUser}=useUserData();
  // create time hour and minute just


  const createdAt=new Date(message.createdAt).toLocaleTimeString()

  return (
    <>
      <div className={message.senderId=== currentUser.id ? styles.myMessage :  styles.userMessage}>
        <img src="/public/images/avatar-01.png" alt="user" />
        <p>
          {message.content}
          <span>{createdAt}</span>
        </p>
      </div>
    </>
  );
}

export default ChatMessage;
