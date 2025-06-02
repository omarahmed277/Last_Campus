// curl -X 'POST' \
//   'https://tawgeeh-v1-production.up.railway.app/question/1' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "question": "How do you think I can help you?",
//   "required": true
// }'
import { toast } from 'react-toastify';

const token = localStorage.getItem("token");

export async function addQuestion(mentorServiceId, question) {
  //   add question and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/question/${mentorServiceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(question),
      }
    );
    if (!res.ok) {
      throw new Error("فشل في إضافة السؤال");
    }
    const data = await res.json();
    toast.success("تمت إضافة السؤال بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في إضافة السؤال: ${error.message}`);
    console.error("Error adding question:", error);
  }
}
// Retrieve all questions
//   Retrieve all questions
export async function RetrieveAllQuestions() {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/question`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("فشل في استرداد الأسئلة");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    toast.error(`خطأ في استرداد الأسئلة: ${error.message}`);
    console.error("Error retrieving questions:", error);
  }
}
// Retrieve question by id
export async function RetrieveQuestionById(questionId) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/question/${questionId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("فشل في استرداد السؤال");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    toast.error(`خطأ في استرداد السؤال: ${error.message}`);
    console.error("Error retrieving question by id:", error);
  }
}
// update question by id
export async function updateQuestion(questionId, question) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/question/${questionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(question),
      }
    );
    if (!res.ok) {
      throw new Error("فشل في تحديث السؤال");
    }
    const data = await res.json();
    toast.success("تم تحديث السؤال بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في تحديث السؤال: ${error.message}`);
    console.error("Error updating question:", error);
  }
}
// delete question by id
export async function deleteQuestion(questionId) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/question/${questionId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("فشل في حذف السؤال");
    }
    const data = await res.json();
    toast.success("تم حذف السؤال بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في حذف السؤال: ${error.message}`);
    console.error("Error deleting question:", error);
  }
}

