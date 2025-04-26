document.addEventListener("DOMContentLoaded", function () {
  // Simulated session data
  const sessionsData = [
    {
      id: 1,
      mentorName: "نهال سراج",
      mentorId: "mentor1",
      title: "جلسة توجيه حول تطوير الويب",
      date: "2025-01-10",
      time: "15:00-15:30",
      status: "upcoming",
      meetingLink: "https://zoom.us/j/123456789",
    },
    {
      id: 2,
      mentorName: "عمر أحمد",
      mentorId: "mentor2",
      title: "جلسة توجيه حول البرمجة",
      date: "2025-01-10",
      time: "15:00-15:30",
      status: "upcoming",
      meetingLink: "https://zoom.us/j/987654321",
    },
    {
      id: 3,
      mentorName: "سارة علي",
      mentorId: "mentor3",
      title: "جلسة استشارية في الموارد البشرية",
      date: "2025-01-12",
      time: "14:00-14:30",
      status: "pending",
      meetingLink: null,
    },
    {
      id: 4,
      mentorName: "خالد عبدالله",
      mentorId: "mentor4",
      title: "جلسة تحليل البيانات",
      date: "2025-01-05",
      time: "10:00-10:30",
      status: "history",
      meetingLink: "https://zoom.us/j/555555555",
    },
  ];

  // Simulated notifications data
  const notificationsData = [
    {
      title: "تنبيه!",
      text: "جلسة جديدة مع نهال سراج تم تأكيدها.",
      avatar: "./mentor-images/omar.jpg",
      actions: [
        { label: "عرض التفاصيل", primary: true },
        { label: "إغلاق", primary: false },
      ],
      variant: "icon-variant",
    },
    {
      title: "تنبيه!",
      text: "موعد جلسة مع عمر أحمد يقترب.",
      avatar: "./mentor-images/khaled.jpg",
      actions: [{ label: "عرض", primary: true }],
      compact: true,
      variant: "icon-variant",
    },
  ];

  // Unified dummy user data
  const dummyUserData = {
    id: 1,
    name: "أحمد فتحي",
    email: "ahmed@example.com",
    image_url: "./ahmedphoto.webp",
    isMentor: true,
  };

  let currentSessions = [...sessionsData];
  let currentNotifications = [...notificationsData];
  let selectedTab = "upcoming";

  // Initialize page
  initializeAuth();
  initializeTabMenu();
  initializeNotifications();
  renderSessions();

  async function initializeAuth() {
    const authSection = document.querySelector(".auth-section");
    const accessToken = localStorage.getItem("authToken");

    if (accessToken) {
      try {
        const userData = await fetchUserData(accessToken);
        if (userData) {
          authSection.innerHTML = `
                <a class="titel" href="./mentor-veiw.html">
                  <img src="${sanitizeHTML(
                    userData.image_url
                  )}" alt="صورة المرشد" style="width: 60px; height: 60px; border-radius: 50%" />
                  <p class="mentor_name">${sanitizeHTML(
                    userData.name
                  )} <img width="24px" height="24px" src="../images/arrow-down.svg"/></p>
                </a>
                <div class="buttonsNav">
                  <button class="messageBtn" aria-label="الرسائل">
                    <img src="./mentor-images/messages-2.svg" alt="رسائل" />
                  </button>
                  <button class="notBtn" aria-label="الإشعارات">
                    <img src="./mentor-images/notification.svg" alt="إشعارات" />
                    <span class="notification-count">${
                      currentNotifications.length
                    }</span>
                  </button>
                </div>
              `;
          const notBtn = authSection.querySelector(".notBtn");
          notBtn.addEventListener("click", toggleNotifications);
          updateNotificationCount();
        }
      } catch (error) {
        console.error("Auth error:", error);
        localStorage.removeItem("authToken");
        initializeAuth();
      }
    } else {
      authSection.innerHTML = `
            <div class="auth-group">
              <button class="signup-btn">انشاء حساب جديد</button>
              <button class="login-btn">تسجيل الدخول</button>
            </div>
          `;
      const signupBtn = authSection.querySelector(".signup-btn");
      const loginBtn = authSection.querySelector(".login-btn");
      if (signupBtn) {
        signupBtn.addEventListener("click", () => {
          window.location.href = "signup1.html";
        });
      }
      if (loginBtn) {
        loginBtn.addEventListener("click", () => {
          window.location.href = "index.html";
        });
      }
      currentNotifications = [];
      updateNotificationCount();
    }
  }

  // Mock fetchUserData (returns unified dummy user data)
  async function fetchUserData(token) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyUserData);
      }, 500);
    });
  }

  function sanitizeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

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

    // Update badge counts
    updateTabBadges();
  }

  function updateTabBadges() {
    const tabs = document.querySelectorAll(".tab");
    const counts = {
      upcoming: sessionsData.filter((s) => s.status === "upcoming").length,
      pending: sessionsData.filter((s) => s.status === "pending").length,
      history: sessionsData.filter((s) => s.status === "history").length,
    };

    tabs.forEach((tab) => {
      const tabType = tab.getAttribute("data-tab");
      const badge = tab.querySelector(".tab-badge");
      if (badge) {
        badge.textContent = counts[tabType];
        badge.style.display = counts[tabType] > 0 ? "inline-flex" : "none";
      } else if (counts[tabType] > 0) {
        const newBadge = document.createElement("span");
        newBadge.className = "tab-badge";
        newBadge.textContent = counts[tabType];
        tab.insertBefore(newBadge, tab.firstChild);
      }
    });
  }

  function initializeNotifications() {
    renderNotifications();

    const showMoreLink = document.querySelector(".show-more-link");
    if (showMoreLink) {
      showMoreLink.addEventListener("click", () => {
        console.log("Show more notifications clicked");
      });
    }
  }

  function renderNotifications() {
    const notificationsContainer = document.querySelector(
      ".notifications-container"
    );
    if (!notificationsContainer) return;
    notificationsContainer.innerHTML = "";

    currentNotifications.forEach((notification, index) => {
      const notificationEl = document.createElement("div");
      notificationEl.className = `notification ${
        notification.compact ? "compact" : ""
      } ${notification.variant || ""}`;
      notificationEl.innerHTML = `
            <div class="notification-left">
              <button class="close-button">×</button>
              ${
                notification.actions && notification.actions.length === 1
                  ? `<button class="action-button">${notification.actions[0].label}</button>`
                  : ""
              }
            </div>
            <div class="notification-content">
              <h3 class="notification-title">${notification.title}</h3>
              ${
                notification.text
                  ? `<p class="notification-text">${notification.text}</p>`
                  : ""
              }
              ${
                notification.actions && notification.actions.length > 1
                  ? `<div class="notification-actions">
                      ${notification.actions
                        .map(
                          (action) => `
                        <button class="action-button ${
                          action.primary ? "" : "secondary"
                        }">${action.label}</button>
                      `
                        )
                        .join("")}
                    </div>`
                  : ""
              }
            </div>
            ${
              notification.avatar
                ? `<div class="notification-right">
                    <div class="avatar">
                      <img src="${notification.avatar}" alt="Avatar" class="avatar-image" />
                    </div>
                  </div>`
                : ""
            }
          `;

      const closeBtn = notificationEl.querySelector(".close-button");
      closeBtn.addEventListener("click", () => {
        currentNotifications.splice(index, 1);
        renderNotifications();
        updateNotificationCount();
      });

      const actionButtons = notificationEl.querySelectorAll(".action-button");
      actionButtons.forEach((btn, btnIndex) => {
        btn.addEventListener("click", () => {
          console.log(
            `Action clicked: ${notification.actions[btnIndex].label}`
          );
        });
      });

      notificationsContainer.appendChild(notificationEl);
    });

    const showMoreLink = document.createElement("a");
    showMoreLink.className = "show-more-link arabic";
    showMoreLink.textContent = "عرض المزيد";
    showMoreLink.href = "#";
    notificationsContainer.appendChild(showMoreLink);
  }

  function updateNotificationCount() {
    const notificationCountEl = document.querySelector(".notification-count");
    if (notificationCountEl) {
      notificationCountEl.textContent = currentNotifications.length;
      notificationCountEl.style.display =
        currentNotifications.length > 0 ? "block" : "none";
    }
  }

  function toggleNotifications() {
    const notificationsContainer = document.querySelector(
      ".notifications-container"
    );
    if (!notificationsContainer) return;
    const isVisible = notificationsContainer.style.display === "block";
    notificationsContainer.style.display = isVisible ? "none" : "block";
  }

  function renderSessions() {
    const sessionsContainer = document.querySelector(".sessions-container");
    if (!sessionsContainer) return;
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
      sessionCard.className = "session-card";
      sessionCard.innerHTML = `
            <div class="session-header">
              <div class="session-title">
                ${session.title}
                <a class="MentorName" href="#Mentor_Profile_${
                  session.mentorId
                }">${session.mentorName}</a>
              </div>
              <div class="back-button">
                <span class="details-btn">
                  التفاصيل
                  <img src="../images/arrow-left.svg" width="24px" height="20px" alt="" />
                </span>
              </div>
            </div>
            <div class="session-time">
              <div class="date-icon">
                <img src="../images/calendar.svg" alt="" />
                <span>${session.date}</span>
              </div>
              <div class="time-icon">
                <img src="../images/timer.svg" alt="" />
                <span>${session.time}</span>
              </div>
            </div>
            <div class="session-actions">
              ${
                session.status === "upcoming"
                  ? `<button class="btn btn-primary" data-action="start">بدء الجلسة</button>`
                  : ""
              }
              <button class="btn" data-action="message">إرسال رسالة</button>
              ${
                session.status !== "history"
                  ? `<button class="btn" data-action="reschedule">تغيير الموعد</button>
                     <button class="btnCancel" data-action="cancel">إلغاء الجلسة</button>`
                  : ""
              }
            </div>
          `;

      initializeSessionCard(sessionCard, session);
      sessionsContainer.appendChild(sessionCard);
    });
  }

  function initializeSessionCard(card, session) {
    const buttons = card.querySelectorAll(".btn, .btnCancel");
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const action = btn.getAttribute("data-action");
        handleSessionAction(session, action);
      });
    });

    const detailsBtn = card.querySelector(".details-btn");
    detailsBtn.addEventListener("click", () => {
      console.log(`Viewing details for session with ${session.mentorName}`);
      // Future implementation: Show session details modal
    });
  }

  function handleSessionAction(session, action) {
    const accessToken = localStorage.getItem("authToken");

    // Validation: Check if user is authenticated
    if (!accessToken) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "يرجى تسجيل الدخول لإجراء هذا الإجراء.",
        confirmButtonText: "حسناً",
      });
      return;
    }

    // Validation for starting session
    if (action === "start") {
      const sessionDateTime = new Date(
        `${session.date}T${session.time.split("-")[0]}`
      );
      const now = new Date();
      if (sessionDateTime > now) {
        Swal.fire({
          icon: "warning",
          title: "لا يمكن بدء الجلسة",
          text: "الجلسة لم تبدأ بعد. يرجى الانتظار حتى الموعد المحدد.",
          confirmButtonText: "حسناً",
        });
        return;
      }
      if (!session.meetingLink) {
        Swal.fire({
          icon: "error",
          title: "خطأ",
          text: "رابط الجلسة غير متوفر.",
          confirmButtonText: "حسناً",
        });
        return;
      }
      window.open(session.meetingLink, "_blank");
      console.log(`Starting session with ${session.mentorName}`);
    }

    // Other actions
    if (action === "message") {
      console.log(`Sending message to ${session.mentorName}`);
      // Future implementation: Open messaging interface
    }

    if (action === "reschedule") {
      console.log(`Rescheduling session with ${session.mentorName}`);
      // Future implementation: Open reschedule modal
    }

    if (action === "cancel") {
      Swal.fire({
        icon: "warning",
        title: "تأكيد الإلغاء",
        text: `هل أنت متأكد من إلغاء الجلسة مع ${session.mentorName}؟`,
        showCancelButton: true,
        confirmButtonText: "إلغاء",
        cancelButtonText: "تراجع",
      }).then((result) => {
        if (result.isConfirmed) {
          currentSessions = currentSessions.filter((s) => s.id !== session.id);
          updateSessions();
          updateTabBadges();
          Swal.fire({
            icon: "success",
            title: "تم الإلغاء",
            text: "تم إلغاء الجلسة بنجاح.",
            confirmButtonText: "حسناً",
          });
        }
      });
    }
  }

  function updateSessions() {
    renderSessions();
  }
});
