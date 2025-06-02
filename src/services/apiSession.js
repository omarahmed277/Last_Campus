// curl -X 'POST' \
//   'https://tawgeeh-v1-production.up.railway.app/sessions/request' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "mentorId": 2,
//   "serviceId": 1,
//   "scheduledAt": "2025-05-01T10:00:00Z",
//   "duration": 60,
//   "answers": [
//     {
//       "questionId": 1,
//       "text": "I want to learn about React."
//     }
//   ],
//   "menteeQ": "I need help with TypeScript best practices."
// }'
import { toast } from "react-toastify";
const token = localStorage.getItem("token");

// Add session request
export async function addSessionRequest(sessionRequest) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/sessions/request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(sessionRequest),
      }
    );
    if (!res.ok) {
      let errorMsg = "فشل في إضافة طلب الجلسة";
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) { /* Ignore */ }
      throw new Error(errorMsg);
    }
    const data = await res.json();
    toast.success("تم إرسال طلب الجلسة بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في إرسال طلب الجلسة: ${error.message}`);
    console.error("Error adding session request:", error);
  }
}
// Accept a session request
export async function acceptSessionRequest(id) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/sessions/request/${id}/accept`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      let errorMsg = "فشل في قبول طلب الجلسة";
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) { /* Ignore */ }
      throw new Error(errorMsg);
    }
    const data = await res.json();
    toast.success("تم قبول طلب الجلسة بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في قبول طلب الجلسة: ${error.message}`);
    console.error("Error accepting session request:", error);
  }
}
// reject a session request
export async function rejectSessionRequest(id) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/sessions/request/${id}/reject`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      let errorMsg = "فشل في رفض طلب الجلسة";
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) { /* Ignore */ }
      throw new Error(errorMsg);
    }
    const data = await res.json();
    toast.success("تم رفض طلب الجلسة.");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في رفض طلب الجلسة: ${error.message}`);
    console.error("Error rejecting session request:", error);
  }
}
// Cancel a session
export async function cancelSession(id) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/sessions/${id}/cancel`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      let errorMsg = "فشل في إلغاء الجلسة";
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) { /* Ignore */ }
      throw new Error(errorMsg);
    }
    const data = await res.json();
    toast.success("تم إلغاء الجلسة بنجاح.");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في إلغاء الجلسة: ${error.message}`);
    console.error("Error cancelling session:", error);
  }
}
// Mark a session as complete
export async function markSessionAsComplete(id) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/sessions/${id}/complete`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      let errorMsg = "فشل في تحديد الجلسة كمكتملة";
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) { /* Ignore */ }
      throw new Error(errorMsg);
    }
    const data = await res.json();
    toast.success("تم تحديد الجلسة كمكتملة بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في تحديد الجلسة كمكتملة: ${error.message}`);
    console.error("Error marking session as complete:", error);
  }
}
// Add notes to a completed session
export async function addNotesToSession(id, notes) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/sessions/${id}/notes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(notes),
      }
    );
    if (!res.ok) {
      let errorMsg = "فشل في إضافة الملاحظات للجلسة";
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) { /* Ignore */ }
      throw new Error(errorMsg);
    }
    const data = await res.json();
    toast.success("تم إضافة الملاحظات بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في إضافة الملاحظات: ${error.message}`);
    console.error("Error adding notes to session:", error);
  }
}
// Add feedback to a completed session
export async function addFeedbackToSession(id, feedback) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/sessions/${id}/feedback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(feedback),
      }
    );
    if (!res.ok) {
      let errorMsg = "فشل في إضافة التقييم للجلسة";
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) { /* Ignore */ }
      throw new Error(errorMsg);
    }
    const data = await res.json();
    toast.success("تم إضافة التقييم بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في إضافة التقييم: ${error.message}`);
    console.error("Error adding feedback to session:", error);
  }
}
// Get all sessions
export async function getAllSessions() {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/sessions/user`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      let errorMsg = "فشل في جلب الجلسات";
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) { /* Ignore */ }
      throw new Error(errorMsg);
    }
    const data = await res.json();
    // toast.success("تم جلب الجلسات بنجاح!"); // Usually too noisy for GET requests
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب الجلسات: ${error.message}`);
    console.error("Error getting all sessions:", error);
  }
}

// Get a specific session
export async function getSessionById(id) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/sessions/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      let errorMsg = `فشل في جلب الجلسة ${id}`;
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) { /* Ignore */ }
      throw new Error(errorMsg);
    }
    const data = await res.json();
    // toast.success(`تم جلب الجلسة ${id} بنجاح!`); // Usually too noisy
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب الجلسة: ${error.message}`);
    console.error("Error getting session by id:", error);
  }
}
