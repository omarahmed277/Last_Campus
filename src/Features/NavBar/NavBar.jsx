import Comunications from "./Comunications";
import Logo from "./Logo";
import NavProfile from "./NavProfile";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

function NavBar({ user }) {
  return (
    <div className={styles.nav}>
      <Logo />
      <div className={styles.navlinks}>
        <NavLink to="/explore">الموجهين</NavLink>
        <NavLink to="/sessions">الجلسات</NavLink>
        <NavLink to="/joinAsMentor">إنضم كموجه</NavLink>
      </div>
      <div className={styles.pro}>
        <Comunications />
        <NavProfile user={user} />
      </div>
    </div>
  );
}

export default NavBar;
