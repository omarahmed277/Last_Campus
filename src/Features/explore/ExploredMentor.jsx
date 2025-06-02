import { Link } from "react-router-dom";
import styles from "./ExploredMentor.module.css";
import { useUserData } from "../../contexts/useUserData";
function ExploredMentor({ user }) {
  const { name, image_url, specialization, id } = user;
  
 const {getUser}=useUserData();
  return (
    <div className={styles.mentor}>
      <div>
        <img src={image_url} alt={name} />
        <Link to={`/user`} onClick={() => getUser(id)}>
          {name}
        </Link>
        <p>{specialization}</p>
        <p>+5 سنوات خبرة</p>
        <div className={styles.social}>
          {user.instagram && (
            <a href={user.instagram} target="_blank" rel="noopener noreferrer">
              <img src="./images/instagram-dark.svg" alt="instagram" />
            </a>
          )}
          {user.linkedIn && (
            <a href={user.linkedIn} target="_blank" rel="noopener noreferrer">
              <img src="./images/linkedin-dark.svg" alt="linkedin" />
            </a>
          )}
          {user.git && (
            <a href={user.git} target="_blank" rel="noopener noreferrer">
              <img src="./images/github-dark.svg" alt="github" />
            </a>
          )}
          {user.behance && (
            <a href={user.behance} target="_blank" rel="noopener noreferrer">
              <img src="./images/behance-dark.svg" alt="behance" />
            </a>
          )}
          {user.dribbble && (
            <a href={user.dribbble} target="_blank" rel="noopener noreferrer">
              <img src="./images/dribbble-dark.svg" alt="dribbble" />
            </a>
          )}
        </div>
      </div>
      <div>
        <p>
          ذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
          النص من{" "}
        </p>
        <div className={styles.btns}>
          <button>تفاصيل</button>
          <button>احجز الان</button>
        </div>
      </div>
    </div>
  );
}

export default ExploredMentor;
