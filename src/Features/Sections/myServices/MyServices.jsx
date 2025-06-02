import MyService from "./MyService";
import styles from "./MyServices.module.css";
import { useNavigate } from "react-router-dom";
function MyServices() {
  const navigate = useNavigate();
  const addServiceModal = () => {
    navigate("/addservice")
  }
  return (
    <div>
      <h2>الخدمات</h2>
      <div className={styles.services}>
        <MyService />
        <MyService />
        <div className={styles.addService}>
          <img src="/public/images/add-square.svg" alt="add" onClick={addServiceModal}/>
        </div>
      </div>
    </div>
  );
}

export default MyServices;
