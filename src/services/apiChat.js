// get all chats
// curl -X 'GET' \
//   'https://tawgeeh-v1-production.up.railway.app/chat' \
//   -H 'accept: application/json'
import { toast } from 'react-toastify';

const token = localStorage.getItem("token");

// Get all chats

// Get all chats
export async function getAllChats() {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/chat`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to get all chats");
    }
    const data = await res.json();
    toast.success("تم جلب جميع المحادثات بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في جلب جميع المحادثات: ${error.message}`);
    console.error("Error loading data:", error); // Keep console.error for debugging
  }
}
//
// Create or get existing chat
// curl -X 'POST' \
//   'https://tawgeeh-v1-production.up.railway.app/chat/create' \
//   -H 'accept: application/json' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "user1Id": 1,
//   "user2Id": 2
// }`
export async function createChat(user1Id, user2Id) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/chat/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user1Id, user2Id }),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to create chat");
    }
    const data = await res.json();
    toast.success("تم إنشاء/استرداد المحادثة بنجاح!");
    return data.data||[];
  } catch (error) {
    toast.error(`خطأ في إنشاء المحادثة: ${error.message}`);
    console.error("Error loading data:", error); // Keep console.error for debugging
  }
}

export async function sendMessage(chatId, senderId, content) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/chat/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ chatId, senderId, content }),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to send message");
    }
    const data = await res.json();
    toast.success("تم إرسال الرسالة بنجاح!");
    return data.data||[];
  } catch (error) {
    toast.error(`خطأ في إرسال الرسالة: ${error.message}`);
    console.error("Error loading data:", error);
  }
}
//Get user chats by id

export async function getUserChatsById(userId) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/chat/${userId}/chats`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to get user chats");
    }
    const data = await res.json();
    return data.data||[];
  } catch (error) {
    toast.error(`خطأ في جلب محادثات المستخدم: ${error.message}`);
    console.error("Error loading data:", error);
  }
}

export async function getChatMessages(chatId) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/chat/${chatId}/messages`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to get chat messages");
    }
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    toast.error(`خطأ في جلب رسائل المحادثة: ${error.message}`);
    console.error("Error loading data:", error);
    return []; // Always return an empty array instead of undefined
  }
}

// Mark messages as read
export async function markMessagesAsRead(chatId) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/chat/mark-as-read?chatId=${chatId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to mark messages as read");
    }
    const data = await res.json();
    // toast.success("تم تحديد الرسائل كمقروءة."); // Optionally add success message
    return data.data;
  } catch (error) {
    toast.error(`خطأ في تحديد الرسائل كمقروءة: ${error.message}`);
    console.error("Error loading data:", error);
  }
}
