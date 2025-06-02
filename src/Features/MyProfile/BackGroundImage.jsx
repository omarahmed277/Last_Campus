import styles from "./BackGroundImage.module.css";
import { updateUserCoverImage } from "../../services/apiUsers";

function BackGroundImage({ user, edit }) {
  const { cover_url, name, id } = user;

  async function handleUpdateBackGround(image) {
    if (!image || !user) return;

    try {
      const formData = new FormData();
      formData.append("cover_url", image);
      const res = await updateUserCoverImage(id, formData);
      if (!res.ok) {
        throw new Error("Failed to update background");
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error updating background:", error);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUpdateBackGround(file);
    }
  };

  return (
    <div className={styles.background}>
      <img
        src={
          cover_url || "/public/images/950x350-gray-solid-color-background.jpg"
        }
        alt={name}
        className={styles.background}
      />

      {edit && (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="coverFile"
          />
          <label htmlFor="coverFile">
            <svg
              className="edit-BG"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M11.05 3.00002L4.20829 10.2417C3.94996 10.5167 3.69996 11.0584 3.64996 11.4334L3.34162 14.1334C3.23329 15.1084 3.93329 15.775 4.89996 15.6084L7.58329 15.15C7.95829 15.0834 8.48329 14.8084 8.74162 14.525L15.5833 7.28335C16.7666 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2333 1.75002 11.05 3.00002Z"
                stroke="#606060"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.0833 4.02502C10.3666 6.39169 12.2333 8.14169 14.6166 8.28336"
                stroke="#606060"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </label>
        </>
      )}
    </div>
  );
}

export default BackGroundImage;
