import AboutMe from "./AboutMe";
import Certificates from "./Certificates";
import Educations from "./Educations";
import Experiences from "./Experiences";
import Statistics from "./Statistics";
import Vedio from "./Vedio";
import styles from "./MainContent.module.css";

function MainContent({ user, edit }) {
  if (!user) return null;
  console.log(user);

  return (
    <div className={styles.content}>
      <div>
        <AboutMe user={user} edit={edit} />
        <Experiences user={user} edit={edit} />
        <Certificates user={user} edit={edit} />
        <Educations user={user} edit={edit} />
      </div>
      <div>
        <Vedio user={user} edit={edit} />
        <Statistics />
      </div>
    </div>
  );
}

export default MainContent;
