import styles from "./BackGroundImage.module.css";
function BackGroundImage({ user, edit }) {
  if (!user) return null;

  const {
    backGroundImage = "/public/images/950x350-gray-solid-color-background.jpg",
    userName,
  } = user;

  return (
    <div className={styles.background}>
      <img src={backGroundImage} alt={userName} className={styles.background} />

      {edit && (
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
      )}
    </div>
  );
}

export default BackGroundImage;
