import { useState } from "react";
import styles from "./Addservice.module.css";

function Addservice() {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.Addservice}>
      <h3>اخبرنا عن خدمتك</h3>
      <p>معلومات أساسية للسماح للمستخدمين بفهم غرضك</p>
      <form action="">
        <div className={styles.inputField}>
          <label htmlFor="name">اسم الخدمة</label>
          <input type="text" name="name" id="name" placeholder="خدمة التوجية" />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="duration">وقت الخدمة</label>
          <input type="text" name="duration" id="duration" placeholder="30" />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="description">وصف الخدمة</label>
          <textarea
            name="description"
            id="description"
            placeholder="خدمة التوجية"
          ></textarea>
        </div>
        <div className={styles.QusetionField}>
          <span>حدد الاسئلة</span>
          <div>
            <div>
              <span className={styles.question}>
                هل اشتغلت قبل كدا ؟
                <img src="/public/images/edit-2.svg" alt="edit" />
                <img src="/public/images/close-circle.svg" alt="close" />
              </span>
              <span className={styles.question}>
                هل اشتغلت قبل كدا ؟
                <img src="/public/images/edit-2.svg" alt="edit" />
                <img src="/public/images/close-circle.svg" alt="close" />
              </span>
              <span className={styles.question}>
                هل اشتغلت قبل كدا ؟
                <img src="/public/images/edit-2.svg" alt="edit" />
                <img src="/public/images/close-circle.svg" alt="close" />
              </span>
            </div>
            <span>
              <img src="/public/images/add-square.svg" alt="add" />
              أضف سؤال
            </span>
          </div>
        </div>
        <div className={styles.QusetionField}>
          <span>حدد مواعيد الخدمة </span>
          <div>
            <div>
              <span className={styles.date}>
                <input type="checkbox" name="" id="" />
                <label htmlFor="">مواعيد شغلي </label>
                <img src="/public/images/edit-2.svg" alt="edit" />
              </span>
              <span className={styles.date}>
                <input type="checkbox" name="" id="" />
                <label htmlFor="">مواعيد شغلي </label>
                <img src="/public/images/edit-2.svg" alt="edit" />
              </span>
              <span className={styles.date}>
                <input type="checkbox" name="" id="" />
                <label htmlFor="">مواعيد شغلي </label>
                <img src="/public/images/edit-2.svg" alt="edit" />
              </span>
            </div>
            <span>
              <img src="/public/images/add-square.svg" alt="add" />
              أضف قالب
            </span>
          </div>
        </div>
        <div className={styles.show}>
          <span>عرض الخدمة على ملفك الشخصي العام</span>
          <img
            onClick={() => setShow(!show)}
            src={
              show
                ? "/public/images/SwitchGray (2).svg"
                : "/public/images/SwitchGRed(1).svg"
            }
            alt="switch"
          />
        </div>
        <div className={styles.btns}>
          <button type="reset" className={styles.cancel}>
            إلغاء
          </button>
          <button className={styles.primary}>حفظ</button>
        </div>
      </form>
    </div>
  );
}

export default Addservice;
