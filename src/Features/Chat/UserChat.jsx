import { useQuery } from "@tanstack/react-query";import styles from "../../Pages/Chat.module.css";
import { useUserData } from "../../contexts/useUserData";
import { useState } from "react";
function UserChat({chat}) {
  const {currentUser}=useUserData();
  const {getChatId}=useUserData();
             

  return (
    <div className={styles.user}>
      <div>
        <img src="../../../public/images/avatar-01.png" alt="avatar" />
        <div>
          <span onClick={()=>getChatId(chat.id)}>{chat.participants.find((participant)=>participant.user.id!==currentUser.id).user.name}</span>
          <p>{chat.messages[chat.messages.length - 1]?.content || 'No messages'}</p>
        </div>
      </div>
      <div>
        <img src="../../../public/images/more.svg" alt="more" />
        <span>{chat.unreadCount}</span>
      </div>
    </div>
  );
}

export default UserChat;
