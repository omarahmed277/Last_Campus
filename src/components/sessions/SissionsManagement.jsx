import { NavLink, Outlet } from "react-router-dom";
import styles from "./SissionsManagement.module.css";
import NavBar from "../NavBar/NavBar";
function SissionsManagement({ curAcount }) {
  return (
    <div class={styles.sessionsManage}>
      <NavBar user={curAcount} />
      <div class={styles.title}>
        <h2>الجلسات</h2>
        <p>
          تحقق من تفاصيل الجلسات و احصل على تجربة سلسة في تنظيم مواعيدك القادمة
        </p>
      </div>
      <div class={styles.sessionsNav}>
        <NavLink to="upcomingSessions">الجلسات القادمه</NavLink>
        <NavLink to="suspendedSessions">الجلسات المعلقه</NavLink>
        <NavLink to="recordedSessions">السجل</NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default SissionsManagement;
