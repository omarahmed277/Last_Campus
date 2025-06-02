import { toast } from "react-toastify";
const token = localStorage.getItem("token");
const getUserIdFromToken = (token) => {
  if (!token) {
    return null; // or handle the case when token is not available
  }
  const payload = token.split(".")[1];
  const decodedPayload = JSON.parse(atob(payload));
  const userId =
    decodedPayload.id || decodedPayload.sub || decodedPayload.user_id;
  return userId;
};

export async function fetchUsers() {
  //   fetch all users and return them
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/users`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (!res.ok) {
      let errorMsg = "فشل في جلب المستخدمين";
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch {
        /* Ignore */
      }
      throw new Error(errorMsg);
    }
    const data = await res.json();
    // toast.success("تم جلب المستخدمين بنجاح!"); // Too noisy
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب المستخدمين: ${error.message}`);
    console.error("Error fetching users:", error);
  }
}
// fetch current User
const userId = getUserIdFromToken(token);

export async function fetchCurrentUser() {
  //   fetch current user and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/users/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (!res.ok) {
      let errorMsg = "فشل في جلب المستخدم الحالي";
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) {
        /* Ignore */
      }
      throw new Error(errorMsg);
    }
    const data = (await res.json()) || {};
    // toast.success("تم جلب المستخدم الحالي بنجاح!"); // Too noisy
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب المستخدم الحالي: ${error.message}`);
    console.error("Error fetching current user:", error);
  }
}
// fetch user by id
export async function fetchUserById(id) {
  //   fetch user by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/users/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (!res.ok) {
      let errorMsg = `فشل في جلب المستخدم ${id}`;
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) {
        /* Ignore */
      }
      throw new Error(errorMsg);
    }
    const data = await res.json();
    // toast.success(`تم جلب المستخدم ${id} بنجاح!`); // Too noisy
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب المستخدم: ${error.message}`);
    console.error("Error fetching user by id:", error);
  }
}

// update user details
export async function updateUser(id, user) {
  //   update user details and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    if (!res.ok) {
      let errorMsg = `فشل في تحديث المستخدم ${id}`;
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) {
        /* Ignore */
      }
      throw new Error(errorMsg);
    }
    const data = await res.json();
    toast.success("تم تحديث بيانات المستخدم بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في تحديث المستخدم: ${error.message}`);
    console.error("Error updating user:", error);
  }
}
// delete user
export async function deleteUser(id) {
  //   delete user and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/users/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (!res.ok) {
      let errorMsg = `فشل في حذف المستخدم ${id}`;
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) {
        /* Ignore */
      }
      throw new Error(errorMsg);
    }
    const data = await res.json();
    toast.success("تم حذف المستخدم بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في حذف المستخدم: ${error.message}`);
    console.error("Error deleting user:", error);
  }
}
//
// Update image of user
export async function updateUserImage(id, image) {
  //   update user image and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/users/profileImg/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(image),
      }
    );
    const data = await res.json();
    if (!res?.ok) {
      let errorMsg = `فشل في تحديث صورة الملف الشخصي`;
      try {
        // Use data directly if already parsed
        errorMsg = data.message || errorMsg;
      } catch (e) {
        /* Ignore */
      }
      throw new Error(errorMsg);
    }
    toast.success("تم تحديث صورة الملف الشخصي بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في تحديث صورة الملف الشخصي: ${error.message}`);
    console.error("Error updating user image:", error);
  }
}
// Update cover image of user
export async function updateUserCoverImage(id, image) {
  //   update user cover image and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/users/coverImg/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(image),
      }
    );
    if (!res.ok) {
      let errorMsg = `فشل في تحديث صورة الغلاف`;
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) {
        /* Ignore */
      }
      throw new Error(errorMsg);
    }
    const data = await res.json();
    toast.success("تم تحديث صورة الغلاف بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في تحديث صورة الغلاف: ${error.message}`);
    console.error("Error updating user cover image:", error);
  }
}
