import Achivement from "./Achivement";
import styles from "./Achivements.module.css";

function Achivements({ user }) {
  if (!user) return null;

  const achievements = user.achievements || [];

  return (
    <div className={styles.achievements}>
      <span>مؤشرات نجاح الجلسه</span>
      <div>
        {achievements.map((achievement, index) => (
          <Achivement achievement={achievement} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Achivements;
