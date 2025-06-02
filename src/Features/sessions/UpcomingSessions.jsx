import styles from "./SissionsManagement.module.css";
import Session from "./Session";
import { getAllSessions } from "../../services/apiSession";
import { useQuery } from "@tanstack/react-query";

function UpcomingSessions() {
  // get sessions by query
  const { data: sessions } = useQuery({
    queryKey: ["sessions"],
    queryFn: getAllSessions,
    });
console.log(sessions)
  return (
    <div class={styles.sessions}>
      {sessions?.map((session, i) => (
        <Session type="upcoming" session={session} key={i} />
      ))}
    </div>
  );
}

export default UpcomingSessions;
