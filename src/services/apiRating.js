import { toast } from 'react-toastify';

const token = localStorage.getItem("token");

export async function rateUser(id, stars, comment) {
  //   rate user by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/ratings/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify({
          stars,
          comment,
        }),
      }
    );
    if (!res.ok) {
      throw new Error("فشل في تقييم المستخدم");
    }
    const data = await res.json();
    toast.success("تم تقييم المستخدم بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في تقييم المستخدم: ${error.message}`);
    console.error("Error rating user:", error);
  }
}

// Get all ratings
export async function getAllRatings() {
  //   get all ratings and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/ratings`,
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
      throw new Error("فشل في جلب جميع التقييمات");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب جميع التقييمات: ${error.message}`);
    console.error("Error fetching all ratings:", error);
  }
}
// Get rating by id
export async function getRatingById(id) {
  //   get rating by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/ratings/${id}`,
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
      throw new Error("فشل في جلب التقييم بالمعرف");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب التقييم بالمعرف: ${error.message}`);
    console.error("Error fetching rating by id:", error);
  }
}
// update rating by id
export async function updateRatingById(id, stars, comment) {
  //   update rating by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/ratings/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify({
          stars,
          comment,
        }),
      }
    );
    if (!res.ok) {
      throw new Error("فشل في تحديث التقييم بالمعرف");
    }
    const data = await res.json();
    toast.success("تم تحديث التقييم بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في تحديث التقييم بالمعرف: ${error.message}`);
    console.error("Error updating rating by id:", error);
  }
}
// delete rating by id
export async function deleteRatingById(id) {
  //   delete rating by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/ratings/${id}`,
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
      throw new Error("فشل في حذف التقييم بالمعرف");
    }
    const data = await res.json();
    toast.success("تم حذف التقييم بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في حذف التقييم بالمعرف: ${error.message}`);
    console.error("Error deleting rating by id:", error);
  }
}
// add Like rating by id
export async function addLikeRatingById(id) {
  //   add like rating by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/ratings/${id}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("فشل في إضافة إعجاب للتقييم بالمعرف");
    }
    const data = await res.json();
    toast.success("تمت إضافة الإعجاب بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في إضافة إعجاب للتقييم: ${error.message}`);
    console.error("Error adding like rating by id:", error);
  }
}
