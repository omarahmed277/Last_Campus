import AboutMe from "./AboutMe";
import Certificates from "./Certificates";
import Educations from "./Educations";
import Experiences from "./Experiences";
import Statistics from "./Statistics";
import Vedio from "./Vedio";
import styles from "./MainContent.module.css";
import { Outlet } from "react-router-dom";

function MainContent({ edit }) {
  return (
    <>
      <Outlet />
      <div className={styles.content}>
        <div>
          <AboutMe edit={edit} />
          <Experiences edit={edit} />
          <Certificates edit={edit} />
          <Educations edit={edit} />
        </div>
        <div>
          <Vedio edit={edit} />
          <Statistics />
        </div>
      </div>
    </>
  );
}

export default MainContent;
