// curl -X 'POST' \
//   'https://tawgeeh-v1-production.up.railway.app/mentor-service' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "name": "Mentor Service",
//   "description": "This is a mentor service",
//   "duration": 30,
//   "isActive": true,
//   "questions": [
//     {
//       "question": "How do you think I can help you?",
//       "required": true
//     }
//   ],
//   "availabilityIds": [
//     1,
//     2
//   ]
// }'
import { toast } from 'react-toastify';

const token = localStorage.getItem("token");

export async function addMentorService(mentorService) {
  //   add mentor service and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/mentor-service`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(mentorService),
      }
    );
    if (!res.ok) {
      throw new Error("فشل في إضافة خدمة الإرشاد");
    }
    const data = await res.json();
    toast.success("تمت إضافة خدمة الإرشاد بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في إضافة خدمة الإرشاد: ${error.message}`);
    console.error("Error adding mentor service:", error);
  }
}
// // Get all mentor services
export async function getAllMentorServices() {
  //   get all mentor services and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/mentor-service`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("فشل في جلب جميع خدمات الإرشاد");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب خدمات الإرشاد: ${error.message}`);
    console.error("Error fetching mentor services:", error);
  }
}
// get mentor service by id
export async function getMentorServiceById(id) {
  //   get mentor service by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/mentor-service/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("فشل في جلب خدمة الإرشاد بواسطة المعرف");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب خدمة الإرشاد: ${error.message}`);
    console.error("Error fetching mentor service by id:", error);
  }
}
// // update mentor service by id
export async function updateMentorServiceById(id, mentorService) {
  //   update mentor service by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/mentor-service/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(mentorService),
      }
    );
    if (!res.ok) {
      throw new Error("فشل في تحديث خدمة الإرشاد بواسطة المعرف");
    }
    const data = await res.json();
    toast.success("تم تحديث خدمة الإرشاد بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في تحديث خدمة الإرشاد: ${error.message}`);
    console.error("Error updating mentor service:", error);
  }
}
// // delete mentor service by id
export async function deleteMentorServiceById(id) {
  //   delete mentor service by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/mentor-service/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("فشل في حذف خدمة الإرشاد بواسطة المعرف");
    }
    const data = await res.json();
    toast.success("تم حذف خدمة الإرشاد بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في حذف خدمة الإرشاد: ${error.message}`);
    console.error("Error deleting mentor service:", error);
  }
}
