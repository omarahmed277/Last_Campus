import { Link } from "react-router-dom";
import styles from "./JoinAsMentor.module.css";

function Status({ status }) {
  return (
    <div className={styles.status}>
      {status === "accepted" && (
        <>
          <div>
            <img src={`/public/images/accepted.svg`} alt={status} />
            <div className={styles.text}>
              <span>تم قبول طلبك بنجاح</span>
              <p>
                تهانينا! تم قبول طلبك للإنضمام كومجه مهني لدينا في Campus.
                بإمكانك الآن البدء في الترتيب لمواعيد جلساتك الإرشادية
              </p>
            </div>
          </div>
          <Link to="/myprofile">الرجوع الى الصفحة الرئيسية</Link>
        </>
      )}
      {status === "rejected" && (
        <>
          <div>
            <img src={`/public/images/rejected.svg`} alt={status} />
            <div className={styles.text}>
              <span>تم رفض طلبك</span>
              <p>
                للأسف لم يتم قبول طلبك لدينا. برجاء إعادة تقديم الطلب و رفع
                السيرة الذاتية ثم تواصل معنا
              </p>
            </div>
          </div>
          <Link to="join">تقديم مرة اخرى</Link>
        </>
      )}
      {status === "review" && (
        <>
          <div>
            <img src={`/public/images/review.png`} alt={status} />
            <div className={styles.text}>
              <span>طلبك قيد المراجعة</span>
              <p>
                تم استلام طلب الإنضمام لدينا في Campus بنجاح و لكن سيرتك الذاتية
                قيد المراجعة و سيصلك إشعار في حالة القبول او الرفض
              </p>
            </div>
          </div>
          <Link to="/myprofile">تم</Link>
        </>
      )}
    </div>
  );
}

export default Status;
