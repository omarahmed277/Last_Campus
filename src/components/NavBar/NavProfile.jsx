import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavProfile({ user }) {
  if (!user) return null;

  const { userImage, name } = user;

  return (
    <>
      <img src={userImage} alt={name} className={styles.proPhoto} />
      <Link to="/myprofile" className="user-name">
        {name}
      </Link>
    </>
  );
}

export default NavProfile;
