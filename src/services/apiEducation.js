// add education
// curl -X 'POST' \
//   'https://tawgeeh-v1-production.up.railway.app/education' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "school": "Harvard University",
//   "degree": "Bachelor of Science in Computer Science",
//   "from": "2020-10-20",
//   "to": "2025-07-15"
// }'
import { toast } from 'react-toastify';



export async function addEducation(education) {
  const token = localStorage.getItem("token");
  //   add education and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/education`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(education),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to add education");
    }
    const data = await res.json();
    toast.success("تمت إضافة التعليم بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في إضافة التعليم: ${error.message}`);
    console.error("Error adding education:", error);
  }
}
//
// Get all education
export async function getAllEducation(userId) {
  const token = localStorage.getItem("token");
  //   get all education and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/education/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );  
    const data = await res.json();
    if(!data?.data){
      return [];
    }
    if (!res.ok) {
      throw new Error("Failed to fetch all education");
    }
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب كل بيانات التعليم: ${error.message}`);
    console.error("Error fetching all education:", error);
  }
}
// Get user's education by id
export async function getEducationById(id) {
  //   get education by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/education/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch education by id");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب التعليم بالمعرف: ${error.message}`);
    console.error("Error fetching education by id:", error);
  }
}
// update education
export async function updateEducation(id, education) {
  const token = localStorage.getItem("token");
  //   update education and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/education/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(education),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to update education");
    }
    const data = await res.json();
    toast.success("تم تحديث التعليم بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في تحديث التعليم: ${error.message}`);
    console.error("Error updating education:", error);
  }
}
// delete education
export async function deleteEducation(id) {
  const token = localStorage.getItem("token");
  //   delete education and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/education/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to delete education");
    }
    const data = await res.json();
    toast.success("تم حذف التعليم بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في حذف التعليم: ${error.message}`);
    console.error("Error deleting education:", error);
  }
}
