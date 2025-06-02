import styles from "./SissionsManagement.module.css";
import Session from "./Session";

function SuspendedSessions({ user }) {
  const { sessions } = user;

  return (
    <div class={styles.sessions}>
      {sessions
        .filter((session) => session.type === "suspended")
        .map((session, i) => (
          <Session type="suspended" session={session} key={i} />
        ))}
    </div>
  );
}

export default SuspendedSessions;
