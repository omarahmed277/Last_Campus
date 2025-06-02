import styles from "./Info.module.css";
import { createChat } from "../../services/apiChat";
import { useForm } from "react-hook-form";
import { useUserData } from "../../contexts/useUserData";
// createChat
function UserActions({ user }) {
  const { handleSubmit } = useForm({
    mode: "onChange",
  });
  const {currentUser}=useUserData();
  const onSubmit = () => {
    createChat(currentUser.id, user.id);
  };
  return (
    <div className={styles.userActions}>
      <div>
        <div>
          <img src="/public/images/heart.svg" alt="heart" />
        </div>
        <div>
          <img
            src="/public/images/messages-1.svg"
            alt="message"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
        <div>
          <img src="/public/images/more (1).svg" alt="more" />
        </div>
      </div>
      <button>احجز جلسة الان</button>
    </div>
  );
}

export default UserActions;
