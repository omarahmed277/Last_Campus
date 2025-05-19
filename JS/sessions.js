document.addEventListener("DOMContentLoaded", function () {
  // Redirect to index.html if no authToken
  const accessToken = localStorage.getItem("authToken");
  if (!accessToken) {
    window.location.href = "../index.html";
    return;
  }

  // State variables
  let currentSessions = [];
  let currentNotifications = [
    {
      title: "تنبيه!",
      text: "يمكنك إضافة جلسة جديدة مع الموجه عمر أحمد فتحي.",
      avatar: "../assets/omar.jpg",
      actions: [
        { label: "الإجراء الأول", primary: true },
        { label: "الإجراء الثاني", primary: false },
      ],
      variant: "icon-variant",
    },
    {
      title: "تنبيه!",
      text: "سارة علي حسن قامت بتحديث ملفها الشخصي.",
      avatar: "../mentor-images/mentor2.jpg",
      actions: [{ label: "الإجراء", primary: true }],
      compact: true,
      variant: "icon-variant",
    },
  ];
  let selectedTab = "upcoming";

  // Fetch sessions from API
  async function fetchSessions() {
    try {
      console.log("Fetching sessions from API...");
      const response = await fetch("https://tawgeeh-v1-production.up.railway.app/sessions/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`فشل جلب الجلسات: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Raw API response:", data);
      if (!data.data || !Array.isArray(data.data)) {
        throw new Error("البيانات المستلمة غير صالحة أو فارغة");
      }

      currentSessions = data.data.map(session => {
        // Parse scheduledAt to derive date and time
        const scheduledDate = new Date(session.scheduledAt);
        const date = scheduledDate.toISOString().split("T")[0]; // e.g., "2025-05-31"
        const startTime = scheduledDate.toTimeString().slice(0, 5); // e.g., "12:00"
        const endTime = new Date(scheduledDate.getTime() + session.duration * 60000)
          .toTimeString()
          .slice(0, 5); // Add duration in minutes
        const time = `${startTime}-${endTime}`; // e.g., "12:00-12:30"

        // Map status to lowercase and match expected values
        const statusMap = {
          PENDING: "pending",
          UPCOMING: "upcoming",
          COMPLETED: "history",
          CANCELLED: "history"
        };
        const status = statusMap[session.status.toUpperCase()] || "pending";
        const completionStatus = session.status === "COMPLETED" ? "done" : session.status === "CANCELLED" ? "cancelled" : "";

        return {
          id: session.id,
          title: session.service?.name || "جلسة توجيهية",
          mentorId: session.mentorId || 0,
          mentorName: session.mentor?.name || "موجه غير محدد",
          mentorTitle: session.mentor?.title || "غير متوفر", // API may not provide this
          mentorAvatar: session.mentor?.avatar || "../assets/default-avatar.png", // API may not provide this
          date,
          time,
          status,
          meetingLink: session.googleMeetUrl || "",
          type: session.service?.name || "جلسة توجيهية",
          notes: session.notes || session.menteeQ || "لا توجد ملاحظات",
          completionStatus
        };
      });
      console.log(`Successfully retrieved ${currentSessions.length} sessions`, currentSessions);
      renderSessions();
    } catch (error) {
      console.error("Error fetching sessions:", error);
      const sessionsContainer = document.querySelector(".sessions-container");
      if (sessionsContainer) {
        sessionsContainer.innerHTML = `<p style="text-align: right; color: #ff0000;">خطأ في جلب الجلسات: ${error.message}</p>`;
      }
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "حدث خطأ أثناء جلب الجلسات. يرجى المحاولة لاحقاً.",
        confirmButtonText: "حسناً",
      });
    }
  }

  // Format date to Arabic
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ar-EG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Initialize page components
  async function initializePage() {
    const authSection = document.querySelector(".auth-section");
    window.common.initializeAuth(
      authSection,
      currentNotifications,
      window.common.showLoginPopup,
      window.common.showSignupPopup,
      window.common.toggleNotifications,
      () => window.common.updateNotificationCount(currentNotifications)
    );

    window.common.initializeLoginPopup(window.common.showSignupPopup);
    window.common.initializeMentorApplicationPopup();
    window.common.initializeSignupPopup();

    initializeTabMenu();
    await fetchSessions(); // Fetch sessions on page load
    window.common.renderNotifications(currentNotifications, () =>
      window.common.updateNotificationCount(currentNotifications)
    );
  }

  // Initialize tab menu
  function initializeTabMenu() {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        tabs.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
        selectedTab = this.getAttribute("data-tab");
        updateSessions();
      });
    });
  }

  // Render sessions based on selected tab
  function renderSessions() {
    const sessionsContainer = document.querySelector(".sessions-container");
    if (!sessionsContainer) return;

    // Show loading state
    sessionsContainer.innerHTML =
      '<div class="loading">جارٍ تحميل الجلسات...</div>';

    setTimeout(() => {
      sessionsContainer.innerHTML = "";
      const sessionsToShow = currentSessions.filter(
        (session) => session.status === selectedTab
      );

      if (sessionsToShow.length === 0) {
        sessionsContainer.innerHTML = `<p style="text-align: right; color: #666;">لا توجد جلسات في هذا القسم.</p>`;
        return;
      }

      sessionsToShow.forEach((session) => {
        const sessionCard = document.createElement("div");
        sessionCard.className = `session-card ${session.status}`;
        if (session.status === "history") {
          sessionCard.classList.add(session.completionStatus);
        }
        sessionCard.setAttribute("data-session-id", session.id);
        sessionCard.innerHTML = `
          <div class="session-header">
            <div class="session-title" id="session-title-${session.id}">
              ${session.title}
              <a class="MentorName" href="#Mentor_Profile_${
                session.mentorId
              }" aria-label="عرض ملف ${session.mentorName}">${
          session.mentorName
        }</a>
              <span class="status-badge ${session.status}">${getStatusLabel(
          session
        )}</span>
            </div>
            <div class="back-button">
              <span class="details-btn" role="button" tabindex="0" aria-label="عرض تفاصيل الجلسة">
                التفاصيل
                <img src="../images/arrow-left.svg" width="24px" height="20px" alt="سهم التفاصيل" />
              </span>
            </div>
          </div>
          <div class="session-details">
            <div class="mentor-info">
              <img src="${
                session.mentorAvatar
              }" alt="${session.mentorName}" class="mentor-avatar">
              <div class="mentor-details">
                <div class="mentor-name">${session.mentorName}</div>
                <div class="mentor-title">${session.mentorTitle}</div>
              </div>
            </div>
            <div class="session-type">
              <div class="type-label">اسم الجلسة</div>
              <div class="type-value">${session.type}</div>
            </div>
            <div class="session-notes">
              <div class="notes-label">ملاحظات المتدرب:</div>
              <div class="notes-text">${session.notes}</div>
            </div>
          </div>
          <div class="session-time">
            <div class="date-icon">
              <img src="../images/calendar.svg" alt="أيقونة التقويم" />
              <span>${formatDate(session.date)}</span>
            </div>
            <div class="time-icon">
              <img src="../images/timer.svg" alt="أيقونة الساعة" />
              <span>${session.time}</span>
            </div>
          </div>
          <div class="session-actions">
            ${
              session.status === "upcoming"
                ? `<button class="btn btn-primary" data-action="start" aria-label="بدء جلسة ${session.title}">بدء الجلسة</button>`
                : ""
            }
            <button class="btn" data-action="message" aria-label="إرسال رسالة إلى ${
              session.mentorName
            }">إرسال رسالة</button>
            ${
              session.status !== "history"
                ? `
                  <button class="btn" data-action="reschedule" aria-label="تغيير موعد جلسة ${session.title}">تغيير الموعد</button>
                  <button class="btnCancel" data-action="cancel" aria-label="إلغاء جلسة ${session.title}">إلغاء الجلسة</button>`
                : ""
            }
          </div>
        `;

        initializeSessionCard(sessionCard, session);
        sessionsContainer.appendChild(sessionCard);
      });
    }, 500); // Simulate loading
  }

  // Get status label for badge
  function getStatusLabel(session) {
    if (session.status === "upcoming") return "قادم";
    if (session.status === "pending") return "معلق";
    if (session.status === "history") {
      return session.completionStatus === "done" ? "مكتمل" : "ملغى";
    }
    return "";
  }

  // Initialize session card interactions
  function initializeSessionCard(card, session) {
    const detailsBtn = card.querySelector(".details-btn");
    detailsBtn.addEventListener("click", () => {
      const isExpanded = card.classList.contains("expanded");
      document.querySelectorAll(".session-card").forEach((c) => {
        c.classList.remove("expanded");
      });
      if (!isExpanded) {
        card.classList.add("expanded");
      }
    });

    const buttons = card.querySelectorAll(".btn, .btnCancel");
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const action = btn.getAttribute("data-action");
        handleSessionAction(session, action, btn);
      });
    });
  }

  // Handle session actions
  async function handleSessionAction(session, action, button) {
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<span class="loading-spinner"></span>';

    try {
      if (action === "start") {
        const sessionDateTime = new Date(
          `${session.date}T${session.time.split("-")[0]}`
        );
        const now = new Date();
        if (sessionDateTime > now) {
          throw new Error(
            "الجلسة لم تبدأ بعد. يرجى الانتظار حتى الموعد المحدد."
          );
        }
        if (!session.meetingLink) {
          throw new Error("رابط الجلسة غير متوفر.");
        }
        window.open(session.meetingLink, "_blank");
      }

      if (action === "message") {
        await Swal.fire({
          icon: "success",
          title: "تم",
          text: `سيتم فتح نافذة المحادثة مع ${session.mentorName}`,
          confirmButtonText: "حسناً",
        });
        window.common.showChat();
      }

      if (action === "reschedule") {
        await Swal.fire({
          icon: "info",
          title: "تغيير الموعد",
          text: `سيتم إرسال طلب لتغيير موعد الجلسة مع ${session.mentorName}`,
          confirmButtonText: "حسناً",
        });
      }

      if (action === "cancel") {
        const result = await Swal.fire({
          icon: "warning",
          title: "تأكيد الإلغاء",
          text: `هل أنت متأكد من إلغاء الجلسة مع ${session.mentorName}؟`,
          showCancelButton: true,
          confirmButtonText: "إلغاء",
          cancelButtonText: "تراجع",
        });

        if (result.isConfirmed) {
          // Send cancel request to API
          const response = await fetch(`https://tawgeeh-v1-production.up.railway.app/sessions/${session.id}/cancel`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!response.ok) {
            throw new Error("فشل إلغاء الجلسة");
          }

          currentSessions = currentSessions.filter((s) => s.id !== session.id);
          currentNotifications.push({
            title: "تنبيه!",
            text: `تم إلغاء جلسة "${session.title}" مع ${session.mentorName}.`,
            avatar: "../mentor-images/default.jpg",
            actions: [{ label: "إغلاق", primary: false }],
            variant: "icon-variant",
          });
          updateSessions();
          window.common.renderNotifications(currentNotifications, () =>
            window.common.updateNotificationCount(currentNotifications)
          );
          await Swal.fire({
            icon: "success",
            title: "تم الإلغاء",
            text: "تم إلغاء الجلسة بنجاح.",
            confirmButtonText: "حسناً",
          });
        }
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "خطأ",
        text: error.message || "حدث خطأ أثناء تنفيذ الإجراء.",
        confirmButtonText: "حسناً",
      });
    } finally {
      button.disabled = false;
      button.innerHTML = originalText;
    }
  }

  // Update sessions display
  function updateSessions() {
    renderSessions();
  }

  // Initialize the page
  initializePage();
});