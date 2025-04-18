import styles from "./Info.module.css";
function Info({ user, edit, onUpdateImage }) {
  if (!user) return null;

  const { userImage = "/public/images/user.png", name, jop } = user;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpdateImage(file);
    }
  };

  return (
    <div className={styles.info}>
      <div>
        <div className="image">
          <img src={userImage} alt={name} className="pro-photo" />
          {edit && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="file"
              />
              <label htmlFor="file" className="edit">
                <img
                  src="/public/images/Frame 1171278367.svg"
                  alt="edit"
                  className={styles.edit}
                />
              </label>
            </>
          )}
        </div>
        <div>
          <span className="user-name">{name}</span>
          <p className="jop">{jop}</p>
          <div>
            {user.git && (
              <a href={user.git} target="_blank" rel="noopener noreferrer">
                <img src="./images/github.svg" alt="github" />
              </a>
            )}
            {user.linkedIn && (
              <a href={user.linkedIn} target="_blank" rel="noopener noreferrer">
                <img src="./images/linkedin.svg" alt="linkedin" />
              </a>
            )}
            {user.behance && (
              <a href={user.behance} target="_blank" rel="noopener noreferrer">
                <img src="./images/behance.svg" alt="behance" />
              </a>
            )}
            {user.dribbble && (
              <a href={user.dribbble} target="_blank" rel="noopener noreferrer">
                <img src="./images/dribbble.svg" alt="dribbble" />
              </a>
            )}
            {user.instagram && (
              <a
                href={user.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="./images/instagram.svg" alt="instagram" />
              </a>
            )}
          </div>
        </div>
      </div>
      <div>
        {edit && <button className={styles.editProfile}>تعديل الحساب</button>}
      </div>
    </div>
  );
}

export default Info;
