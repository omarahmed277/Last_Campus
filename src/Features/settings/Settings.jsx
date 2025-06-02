import { useState } from "react";
import styles from "./Setting.module.css";

function Settings() {
  const [credibility, setCredibility] = useState(false);
  const [appNot, setAppNot] = useState(false);
  const [emailNot, setEmailNot] = useState(false);
  return (
    <div>
      <h2>الإعدادات</h2>
      <div className={styles.sets}>
        <h3>إعدادات الحساب العامة</h3>
        <div>
          <div className={styles.set}>
            <span>تغيير كلمة المرور</span>
            <span>
              <img src="../../../public/images/edit-2wight.svg" alt="edit" />
              تغيير
            </span>
          </div>
          <div className={styles.set}>
            <span>تفعيل/إيقاف المصادقة الثنائية</span>
            <img
              onClick={() => setCredibility(!credibility)}
              src={
                credibility
                  ? "../../../public/images/SwitchGray (2).svg"
                  : "../../../public/images/SwitchGRed(1).svg"
              }
              alt="switch"
            />
          </div>
          <div className={styles.set}>
            <p>حذف الحساب</p>
            <p>حذف</p>
          </div>
        </div>
      </div>
      <div className={styles.sets}>
        <h3>إدارة الإشعارات</h3>
        <div>
          <div className={styles.set}>
            <span>تفعيل/إيقاف الإشعارات داخل التطبيق</span>
            <img
              onClick={() => setAppNot(!appNot)}
              src={
                appNot
                  ? "../../../public/images/SwitchGray (2).svg"
                  : "../../../public/images/SwitchGRed(1).svg"
              }
              alt="switch"
            />
          </div>
          <div className={styles.set}>
            <span>اختيار أنواع الإشعارات</span>
            <span>تحديد</span>
          </div>
          <div className={styles.set}>
            <span>التحكم في إشعارات البريد الإلكتروني</span>
            <img
              onClick={() => setEmailNot(!emailNot)}
              src={
                emailNot
                  ? "../../../public/images/SwitchGray (2).svg"
                  : "../../../public/images/SwitchGRed(1).svg"
              }
              alt="switch"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
