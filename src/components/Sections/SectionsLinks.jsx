import { NavLink } from "react-router-dom";
import styles from "./SectionsLinks.module.css";

function SectionsLinks() {
  return (
    <div className={styles.sections}>
      <NavLink to="about">نظرة عامة</NavLink>
      <NavLink to="rates">تقييماتي</NavLink>
      <NavLink to="achivements">إنجازاتي</NavLink>
    </div>
  );
}

export default SectionsLinks;
