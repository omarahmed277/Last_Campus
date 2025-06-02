import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useState } from "react";

function NavProfile({ user }) {
  const [showOpts, setShowOpts] = useState(false);

  const { userImage = "/public/images/user.png", name } = user;

  return (
    <>
      <img src={userImage} alt={name} className={styles.proPhoto} />
      <span>
        {name}
        <img
          src="/public/images/arrow-down.svg"
          alt="down"
          onClick={() => setShowOpts(() => !showOpts)}
        />
      </span>
      {showOpts && (
        <div className={styles.options}>
          <Link to="/myprofile">
            <img src="/public/images/profile.svg" alt="profile" />
            حسابي
          </Link>
          <Link to="/settings">
            <img src="/public/images/setting-2.svg" alt="setting" />
            الاعدادات
          </Link>
          <span>
            <img src="/public/images/logout.svg" alt="logout" />
            تسجيل خروج
          </span>
        </div>
      )}
    </>
  );
}

export default NavProfile;
