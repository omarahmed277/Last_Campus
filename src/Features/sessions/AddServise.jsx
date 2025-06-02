import React, { useState } from "react";
import styles from "./AddSevice.module.css";

const ServiceForm = () => {
  const [serviceName, setServiceName] = useState("");
  const [duration, setDuration] = useState(30);
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState(["هل اكتشفت قبل كدا ؟"]);
  const [schedules, setSchedules] = useState(["مواعيد شغلي"]);
  const [showPublic, setShowPublic] = useState(false);

  const addQuestion = () => {
    setQuestions([...questions, "سؤال جديد"]);
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const addSchedule = () => {
    setSchedules([...schedules, "مواعيد شغلي"]);
  };

  const handleSubmit = async () => {
    const data = {
      serviceName,
      duration,
      description,
      questions,
      schedules,
      showPublic,
    };

    try {
      const response = await fetch(
        "https://your-api-link-here.com/api/services",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        alert("تم حفظ الخدمة بنجاح!");
      } else {
        alert("حدث خطأ أثناء حفظ الخدمة.");
      }
    } catch (error) {
      console.error("Error saving service:", error);
      alert("تعذر الاتصال بالخادم.");
    }
  };

  return (
    <div className={styles.container} dir="rtl">
      <h2 className={styles.heading}>اخبرنا عن خدمتك</h2>
      <p className={styles.subtitle}>
        معلومات أساسية للسماح للمستخدمين بفهم غرضك
      </p>

      <input
        type="text"
        placeholder="اسم الخدمة"
        className={styles.input}
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
      />

      <input
        type="number"
        placeholder="وقت الخدمة"
        className={styles.input}
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <textarea
        placeholder="وصف الخدمة"
        className={styles.textarea}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className={styles.section}>
        <label className={styles.label}>حدد الأسئلة</label>
        <div className={styles.tags}>
          {questions.map((q, idx) => (
            <div key={idx} className={styles.tag}>
              {q}
              <button className={styles.edit}>✏️</button>
              <button
                className={styles.delete}
                onClick={() => removeQuestion(idx)}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
        <button className={styles.addBtn} onClick={addQuestion}>
          أضف سؤال +
        </button>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>حدد مواعيد الخدمة</label>
        <div className={styles.checkboxes}>
          {schedules.map((s, idx) => (
            <label key={idx} className={styles.checkboxItem}>
              <input type="checkbox" />
              {s}
              <button className={styles.edit}>✏️</button>
            </label>
          ))}
        </div>
        <button className={styles.addBtn} onClick={addSchedule}>
          أضف قالب +
        </button>
      </div>

      <div className={styles.section}>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={showPublic}
            onChange={() => setShowPublic(!showPublic)}
          />
          عرض الخدمة على ملفك الشخصي العام
        </label>
      </div>

      <div className={styles.buttons}>
        <button className={styles.save} onClick={handleSubmit}>
          حفظ
        </button>
        <button className={styles.cancel}>إلغاء</button>
      </div>
    </div>
  );
};

export default ServiceForm;
