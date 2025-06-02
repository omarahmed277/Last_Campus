import React from "react";
import styles from "./Appointment.module.css";

const days = [
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
  "الأحد",
];
const times = Array.from({ length: 14 }, (_, i) => `${13 + i}:00`);
const appointments = [
  { day: 0, time: "13:00", duration: 60 },
  { day: 0, time: "14:00", duration: 60 },
  { day: 0, time: "15:00", duration: 60 },
  { day: 1, time: "13:00", duration: 60 },
  { day: 1, time: "14:00", duration: 60 },
];

const FullScheduler = () => {
  return (
    <div className={styles.container} dir="rtl">
      <div className={styles.calendar}>
        <div className={styles.header}>
          <div className={styles.timeCol}></div>
          {days.map((day, i) => (
            <div key={i} className={styles.dayHeader}>
              {day}
            </div>
          ))}
        </div>
        <div className={styles.body}>
          <div className={styles.timeCol}>
            {times.map((time, i) => (
              <div key={i} className={styles.timeCell}>
                {time}
              </div>
            ))}
          </div>
          {days.map((_, dayIndex) => (
            <div key={dayIndex} className={styles.dayCol}>
              {times.map((_, timeIndex) => (
                <div key={timeIndex} className={styles.cell}></div>
              ))}
              {appointments
                .filter((app) => app.day === dayIndex)
                .map((app, i) => (
                  <div
                    key={i}
                    className={styles.appointment}
                    style={{
                      top: (parseInt(app.time) - 13) * 40 + "px",
                    }}
                  >
                    {app.time} ({app.duration} min)
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.sidebar}>
        <h3>العنوان</h3>
        <section>
          <h4>مدى التوفر العام</h4>
          <select className={styles.input}>
            <option>تكرار أسبوعياً</option>
          </select>
        </section>

        <section>
          <h4>تحديد المواعيد</h4>
          {days.map((day, i) => (
            <div key={i} className={styles.dayRow}>
              {day} <span className={styles.unavailable}>غير متاح</span>
            </div>
          ))}
        </section>

        <section>
          <h4>إطار الزمن لتحديد المواعيد</h4>
          <div className={styles.input}>متاح الآن</div>
          <div className={styles.input}>تاريخ البدء ووقت الانتهاء</div>
          <div className={styles.input}>الحد الأقصى للحجز مسبقاً: ٣ أيام</div>
          <div className={styles.input}>الحد الأدنى قبل الموعد: ٤ ساعات</div>
        </section>

        <section>
          <h4>إعدادات المواعيد المحجوزة</h4>
          <div className={styles.input}>الفاصل الزمني: ٣٠ دقيقة</div>
          <div className={styles.input}>الحد الأقصى يومياً: ٤</div>
        </section>
      </div>
    </div>
  );
};

export default FullScheduler;
