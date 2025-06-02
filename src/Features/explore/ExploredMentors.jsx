import ExploredMentor from "./ExploredMentor";
import styles from "./ExploredMentors.module.css";
import { useUserData } from "../../contexts/useUserData";
function ExploredMentors() {
  const { filteredUsers } = useUserData();
  
  return (
    <div className={styles.mentors}>

      {filteredUsers?.map((user, i) => (
        <ExploredMentor user={user} key={i} />
      ))}
    </div>
  );
}

export default ExploredMentors;
