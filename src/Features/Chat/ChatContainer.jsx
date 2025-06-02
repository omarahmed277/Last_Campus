import styles from "../../Pages/Chat.module.css";
import ChatMessage from "./ChatMessage";
import { useUserData } from "../../contexts/useUserData";
import { useForm } from "react-hook-form";
import { sendMessage } from "../../services/apiChat";
import { useEffect } from "react";
function ChatContainer() {
  const {userChats,currentUser}=useUserData();

  const {handleSubmit,register}=useForm({
    mode:"onChange"
  })
  const onSubmit=(data)=>{
    const chatId = userChats?.length > 0 ? userChats[0].chatId : (userChats?.length > 0 ? userChats[0]?.id : null);
    if (chatId) {
      sendMessage(chatId, currentUser.id, data.message)
    } else {
      console.warn('No chat selected to send message')
    }
  }
  return (
    <div className={styles.chatContainer}>
      {/* <div className={styles.empaty}>
        <img src="../../../public/images/messages-1.svg" alt="messages" />
        <div>
          <span>ابدأ محادثة جديدة</span>
          <p>ستظهر الرسائل هنا بعد التواصل مع المينتور أو المنتيي.</p>
        </div>
        <Link>
          ابدأ المحادثة{" "}
          <img src="../../../public/images/messages-2.svg" alt="messages" />
        </Link>
      </div> */}
      <div className={styles.userInfo}>
        <img src="../../../public/images/user.png" alt="user" />
        <div>
          <h3>سارة عبدالله </h3>
          <p>متصل الان</p>
        </div>
      </div>
      <div className={styles.chatMessages}>
        {userChats?.length > 0 ? (
          userChats[0]?.messages?.map((message)=>(
            <ChatMessage key={message.id} message={message}/>
          ))
        ) : (
          <div className={styles.emptyChatMessage}>
            <p>لا توجد رسائل حتى الآن</p>
          </div>
        )}
      </div>
      <div className={styles.chatInput}>
        <div>
          <img src="../../../public/images/squares-2x2.svg" alt="attach" />
          <input type="text" placeholder="اكتب رسالتك هنا..." {...register("message")}/>
        </div>
        <img src="/public/images/send-2.svg" alt="send" onClick={handleSubmit(onSubmit)}/>
      </div>
    </div>
  );
}

export default ChatContainer;
