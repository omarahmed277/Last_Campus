import ExploredMentor from "./ExploredMentor";
import styles from "./ExploredMentors.module.css";
function ExploredMentors({ users }) {
  return (
    <div className={styles.mentors}>
      {users.map((user, i) => (
        <ExploredMentor user={user} key={i} />
      ))}
    </div>
  );
}

export default ExploredMentors;
