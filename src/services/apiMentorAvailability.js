// curl -X 'POST' \
//   'https://tawgeeh-v1-production.up.railway.app/mentor-availability' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "title": "Work time",
//   "dayOfWeek": "MONDAY",
//   "availableFrom": "2025-04-27",
//   "expireAt": "2025-10-27",
//   "maxDaysBefore": 30,
//   "minHoursBefore": 24,
//   "maxBookingsPerDay": 5,
//   "breakMinutes": 15,
//   "startTime": "2025-04-27T09:00:00Z",
//   "endTime": "2025-04-27T17:00:00Z",
//   "isRecurring": true,
//   "specificDate": "2025-04-27"
// }'
import { toast } from 'react-toastify';

const token = localStorage.getItem("token");

// add mentor availability
export async function addMentorAvailability(mentorAvailability) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/mentor-availability`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(mentorAvailability),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to add mentor availability");
    }
    const data = await res.json();
    toast.success("تمت إضافة توافر المرشد بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في إضافة توافر المرشد: ${error.message}`);
    console.error("Error adding mentor availability:", error);
  }
}
// retrieve mentor availability 
export async function retrieveMentorAvailability() {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/mentor-availability`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to retrieve mentor availability");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    toast.error(`خطأ في استرداد توافر المرشد: ${error.message}`);
    console.error("Error retrieving mentor availability:", error);
  }
}
// retrieve mentor availability by id
export async function retrieveMentorAvailabilityById(id) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/mentor-availability/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to retrieve mentor availability");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    toast.error(`خطأ في استرداد توافر المرشد بالمعرف: ${error.message}`);
    console.error("Error retrieving mentor availability by id:", error);
  }
}
// update mentor availability by id
export async function updateMentorAvailability(id, mentorAvailability) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/mentor-availability/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify(mentorAvailability),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to update mentor availability");
    }
    const data = await res.json();
    toast.success("تم تحديث توافر المرشد بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في تحديث توافر المرشد: ${error.message}`);
    console.error("Error updating mentor availability:", error);
  }
}
// delete mentor availability by id
export async function deleteMentorAvailability(id) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/mentor-availability/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to delete mentor availability");
    }
    const data = await res.json();
    toast.success("تم حذف توافر المرشد بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في حذف توافر المرشد: ${error.message}`);
    console.error("Error deleting mentor availability:", error);
  }
}
