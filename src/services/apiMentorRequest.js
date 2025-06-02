// curl -X 'POST' \
//   'https://tawgeeh-v1-production.up.railway.app/mentor-requests' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "specialization": "BSc in Computer Science, 3 years backend development",
//   "experienceLevel": "Senior Node.js and NestJS",
//   "TargetMentees": "Jounior Node.js developers",
//   "linkedin": "https://www.linkedin.com/in/your-profile",
//   "bio": "I am a software engineer with 5 years of experience in web development.",
//   "status": "PENDING",
//   "reviewedBy": 1234567890,
//   "reviewedAt": "2025-04-027"
// }'
import { toast } from 'react-toastify';

const token = localStorage.getItem("token");

// add mentor request
export async function addMentorRequest(mentorRequest) {
  try {
    // Validate and transform the request payload
    const payload = {
      speciality: mentorRequest.speciality,
      experience: mentorRequest.experience,
      target: mentorRequest.target,
      linkedin: mentorRequest.linkedin,
      about: mentorRequest.about
    };


    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/mentor-requests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const responseData = await res.json();
    console.log('Response:', responseData);

    if (!res.ok) {
      throw new Error(responseData.message || "Failed to add mentor request");
    }

    toast.success("تم تقديم طلب الإرشاد بنجاح!");
    return responseData.data;
  } catch (error) {
    toast.error(`خطأ في تقديم طلب الإرشاد: ${error.message}`);
    console.error("Error adding mentor request:", error);
    throw error; // Re-throw to allow caller to handle the error
  }
}
// Get pending mentor requests
export async function getPendingMentorRequests() {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/mentor-requests/pending`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to get pending mentor requests");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب طلبات الإرشاد المعلقة: ${error.message}`);
    console.error("Error fetching pending mentor requests:", error);
  }
}
// Update mentor request status
export async function updateMentorRequestStatus(id, status) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/mentor-requests/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to update mentor request status");
    }
    const data = await res.json();
    toast.success("تم تحديث حالة طلب الإرشاد بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في تحديث حالة طلب الإرشاد: ${error.message}`);
    console.error("Error updating mentor request status:", error);
  }
}
