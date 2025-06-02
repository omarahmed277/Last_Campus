// curl -X 'GET' \
//   'https://tawgeeh-v1-production.up.railway.app/notifications/stream?userId=1' \
//   -H 'accept: */*'
import { toast } from 'react-toastify';

const token = localStorage.getItem("token");

// Get notifications stream
export async function getNotificationsStream(userId) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/notifications/stream?userId=${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to get notifications stream");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب بث الإشعارات: ${error.message}`);
    console.error("Error getting notification stream:", error);
  }
}
