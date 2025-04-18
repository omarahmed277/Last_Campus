import Comunications from "./Comunications";
import Logo from "./Logo";
import NavProfile from "./NavProfile";
import styles from "./NavBar.module.css";

function NavBar({ user }) {
  return (
    <div className={styles.nav}>
      <Logo />
      <div>
        <Comunications />
        <NavProfile user={user} />
      </div>
    </div>
  );
}

export default NavBar;
