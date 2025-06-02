import styles from "./Info.module.css";
import { updateUserImage } from "../../services/apiUsers";
import UserActions from "./UserActions";

function Info({ user, edit }) {
  if (!user) return null;

  const {
    image_url,
    name,
    specialization,
    id,
    behance,
    github,
    instagram,
    linkedin,
  } = user;

  async function handleUpdateImage(image) {
    if (!image || !user) return;

    try {
      const formData = new FormData();
      formData.append("image_url", image);
      const res = await updateUserImage(id, formData);
      if (!res?.ok) {
        throw new Error("Failed to update image");
      }
      const data = await res.json();
    } catch (error) {
      console.error("Error updating image:", error);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      handleUpdateImage(file);
    }
  };

  return (
    <div className={styles.info}>
      <div>
        <div className="image">
          <img
            src={image_url || "/public/images/user.png"}
            alt={name}
            className="pro-photo"
          />
          {edit && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="imageFile"
              />
              <label htmlFor="imageFile" className="edit">
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
          <p>{specialization}</p>
          <div>
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer">
                <img src="./images/github.svg" alt="github" />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <img src="./images/linkedin.svg" alt="linkedin" />
              </a>
            )}
            {behance && (
              <a href={behance} target="_blank" rel="noopener noreferrer">
                <img src="./images/behance.svg" alt="behance" />
              </a>
            )}
            {user.dribbble && (
              <a href={user.dribbble} target="_blank" rel="noopener noreferrer">
                <img src="./images/dribbble.svg" alt="dribbble" />
              </a>
            )}
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer">
                <img src="./images/instagram.svg" alt="instagram" />
              </a>
            )}
          </div>
        </div>
      </div>
      <div>
        {edit ? (
          <button className={styles.editProfile}>تعديل الحساب</button>
        ) : (
          <UserActions user={user} />
        )}
      </div>
    </div>
  );
}

export default Info;
