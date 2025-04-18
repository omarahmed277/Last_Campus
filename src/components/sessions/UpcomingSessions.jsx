import styles from "./SissionsManagement.module.css";
import Session from "./Session";

function UpcomingSessions({ user }) {
  const { sessions } = user;

  return (
    <div class={styles.sessions}>
      {sessions
        .filter((session) => session.type === "upcoming")
        .map((session, i) => (
          <Session type="upcoming" session={session} key={i} />
        ))}
    </div>
  );
}

export default UpcomingSessions;
