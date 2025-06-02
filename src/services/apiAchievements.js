// curl -X 'POST' \
//   'https://tawgeeh-v1-production.up.railway.app/achievements' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "name": "100 minutes sessions",
//   "image": "https://unsplash.com/photos/abc123",
//   "date": "2023-01-01"
// }'
import { toast } from 'react-toastify';

const token = localStorage.getItem("token");

export async function addAchievement(achievement) {
  //   add achievement and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/achievements`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(achievement),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to add achievement");
    }
    const data = await res.json();
    toast.success("تمت إضافة الإنجاز بنجاح!"); // Success toast
    return data.data;
  } catch (error) {
    toast.error(`خطأ في إضافة الإنجاز: ${error.message}`);
    console.error("Error adding achievement:", error);
  }
}
// // Get all achievements
export async function getAllAchievements() {
  //   get all achievements and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/achievements`,
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
      throw new Error("Failed to fetch all achievements");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب كل الإنجازات: ${error.message}`);
    console.error("Error fetching all achievements:", error);
  }
}
// // Get achievement by id
export async function getAchievementById(id) {
  //   get achievement by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/achievements/${id}`,
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
      throw new Error("Failed to fetch achievement by id");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب الإنجاز بالمعرف: ${error.message}`);
    console.error("Error fetching achievement by id:", error);
  }
}
// // Update achievement by id
export async function updateAchievementById(id, achievement) {
  //   update achievement by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/achievements/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(achievement),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to update achievement by id");
    }
    const data = await res.json();
    toast.success("تم تحديث الإنجاز بنجاح!"); // Success toast
    return data.data;
  } catch (error) {
    toast.error(`خطأ في تحديث الإنجاز بالمعرف: ${error.message}`);
    console.error("Error updating achievement by id:", error);
  }
}
// // Delete achievement by id
export async function deleteAchievementById(id) {
  //   delete achievement by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/achievements/${id}`,
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
      throw new Error("Failed to delete achievement by id");
    }
    const data = await res.json();
    toast.success("تم حذف الإنجاز بنجاح!"); // Success toast
    return data.data;
  } catch (error) {
    toast.error(`خطأ في حذف الإنجاز بالمعرف: ${error.message}`);
    console.error("Error deleting achievement by id:", error);
  }
}
