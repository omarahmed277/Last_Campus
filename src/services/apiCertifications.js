import { toast } from 'react-toastify';

const token = localStorage.getItem("token");

export async function addCertification(certification) {
  //   add certification and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/certifications`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(certification),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to add certification");
    }
    const data = await res.json();
    toast.success("تمت إضافة الشهادة بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في إضافة الشهادة: ${error.message}`);
    console.error("Error adding certification:", error);
  }
}
// // Get all certifications
export async function getAllCertifications(userId) {
  //   get all certifications and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/certifications/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
      }
    );
    const data = await res.json();
    if(!data?.data){
      return [];
    }
    if (!res.ok) {
      throw new Error("Failed to fetch all certifications");
    }
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب كل الشهادات: ${error.message}`);
    console.error("Error fetching all certifications:", error);
  }
}
// // Get certification by id
export async function getCertificationById(id) {
  //   get certification by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/certifications/${id}`,
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
      throw new Error("Failed to fetch certification by id");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب الشهادة بالمعرف: ${error.message}`);
    console.error("Error fetching certification by id:", error);
  }
}
// // Update certification by id
export async function updateCertificationById(id, certification) {
  //   update certification by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/certifications/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(certification),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to update certification by id");
    }
    const data = await res.json();
    toast.success("تم تحديث الشهادة بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في تحديث الشهادة بالمعرف: ${error.message}`);
    console.error("Error updating certification by id:", error);
  }
}
// // Delete certification by id
export async function deleteCertificationById(id) {
  //   delete certification by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/certifications/${id}`,
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
      throw new Error("Failed to delete certification by id");
    }
    const data = await res.json();
    toast.success("تم حذف الشهادة بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في حذف الشهادة بالمعرف: ${error.message}`);
    console.error("Error deleting certification by id:", error);
  }
}
