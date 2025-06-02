// add experience
// curl -X 'POST' \
//   'https://tawgeeh-v1-production.up.railway.app/experiences' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "title": "Developer",
//   "company": "Company Name",
//   "from": "2023-01-01",
//   "to": "2023-12-31",
//   "stillThere": true,
//   "summary": "Description of the experience"
// }'
import { toast } from 'react-toastify';



export async function addExperience(experience) {
  const token = localStorage.getItem("token");
  //   add experience and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/experiences`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(experience),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to add experience");
    }
    const data = await res.json();
    toast.success("تمت إضافة الخبرة بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في إضافة الخبرة: ${error.message}`);
    console.error("Error adding experience:", error);
  }
}
// Get all experiences
export async function getAllExperiences(id) {
  //   get all experiences and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/experiences/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    if(!data?.data){
      return [];
    }
    if (!res.ok) {
      throw new Error("Failed to fetch all experiences");
    }
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب كل الخبرات: ${error.message}`);
    console.error("Error fetching all experiences:", error);
  }
}
// Get experience by id
export async function getExperienceById(userid,experienceid) {
  const token = localStorage.getItem("token");
  //   get experience by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/experiences/${userid}/${experienceid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch experience by id");
    }
    const data = await res.json();
      return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب الخبرة بالمعرف: ${error.message}`);
    console.error("Error fetching experience by id:", error);
  }
}
// Update experience by id
export async function updateExperienceById(id, experience) {
  const token = localStorage.getItem("token");
  //   update experience by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/experiences/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(experience),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to update experience by id");
    }
    const data = await res.json();
    toast.success("تم تحديث الخبرة بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في تحديث الخبرة بالمعرف: ${error.message}`);
    console.error("Error updating experience by id:", error);
  }
}
// Delete experience by id
export async function deleteExperienceById(id) {
  const token = localStorage.getItem("token");
  //   delete experience by id and return it
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/experiences/${id}`,
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
      throw new Error("Failed to delete experience by id");
    }
    const data = await res.json();
    toast.success("تم حذف الخبرة بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في حذف الخبرة بالمعرف: ${error.message}`);
    console.error("Error deleting experience by id:", error);
  }
}
