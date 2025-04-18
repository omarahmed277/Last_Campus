import { Outlet } from "react-router-dom";
import styles from "../components//joinAsAMentor/JoinAsMentor.module.css";

function JoinAsMentor() {
  return (
    <div className={styles.module}>
      <Outlet />
    </div>
  );
}

export default JoinAsMentor;
