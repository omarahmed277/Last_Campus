import styles from "./SissionsManagement.module.css";
import Session from "./Session";

function RecordedSessions({ user }) {
  const { sessions } = user;

  return (
    <div class={styles.sessions}>
      {sessions
        .filter(
          (session) =>
            session.type === "canceled" || session.type === "successed"
        )
        .map((session, i) => (
          <Session type={session.type} session={session} key={i} />
        ))}
    </div>
  );
}

export default RecordedSessions;
