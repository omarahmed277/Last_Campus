document.addEventListener("DOMContentLoaded", function () {
  const mentorsData = [
    {
      name: "عمر أحمد فتحي",
      title: "Full Stack Developer",
      experience: "+5 سنوات خبرة",
      category: "البرمجة",
      description:
        "خبير في تطوير تطبيقات الويب باستخدام JavaScript وNode.js. أحب البحث عن حلول مبتكرة وأمتلك خبرة قوية في تصميم وتطوير تطبيقات متكاملة.",
      avatar: "./omar.jpg",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "سارة علي حسن",
      title: "HR Specialist",
      experience: "+3 سنوات خبرة",
      category: "الموارد البشرية",
      description:
        "متخصصة في إدارة الموارد البشرية والتطوير التنظيمي. أمتلك خبرة في توظيف المواهب وتطوير استراتيجيات تعزز بيئة العمل.",
      avatar:
        "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-20/5BupekvnRw.png",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "خالد عبدالله محمد",
      title: "Data Scientist",
      experience: "+4 سنوات خبرة",
      category: "علوم البيانات",
      description:
        "خبير في تحليل البيانات وتطبيقات الذكاء الاصطناعي. أعمل على بناء نماذج تحليلية تساعد الشركات على اتخاذ قرارات استراتيجية.",
      avatar: "./mentor-images/khaled.jpg",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "منى إبراهيم سالم",
      title: "UI/UX Designer",
      experience: "+6 سنوات خبرة",
      category: "التصميم",
      description:
        "متخصصة في تصميم واجهات المستخدم وتجربة المستخدم. أحب إنشاء تصاميم جذابة وسهلة الاستخدام تعزز تجربة المستخدم.",
      avatar: "https://via.placeholder.com/150",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "محمد ياسر عبدالرحمن",
      title: "DevOps Engineer",
      experience: "+8 سنوات خبرة",
      category: "البرمجة",
      description:
        "خبير في إدارة البنية التحتية والتكامل المستمر. أعمل على تحسين العمليات التقنية لضمان الكفاءة والاستقرار.",
      avatar: "./mentor-images/mohammed.jpg",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "ليلى خالد محمود",
      title: "Marketing Manager",
      experience: "+5 سنوات خبرة",
      category: "التسويق",
      description:
        "متخصصة في استراتيجيات التسويق الرقمي والعلامات التجارية. أساعد الشركات على بناء حضور قوي عبر الإنترنت.",
      avatar:
        "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-20/laila.png",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "يوسف سمير أحمد",
      title: "Mobile App Developer",
      experience: "+3 سنوات خبرة",
      category: "البرمجة",
      description:
        "مطور تطبيقات الهاتف باستخدام React Native. أركز على تطوير تطبيقات سريعة وسهلة الاستخدام.",
      avatar: "./mentor-images/youssef.jpg",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "ريماس عبدالعزيز",
      title: "Cybersecurity Analyst",
      experience: "+6 سنوات خبرة",
      category: "الأمن السيبراني",
      description:
        "خبيرة في حماية الأنظمة واختبار الاختراق. أعمل على ضمان أمان البنية التحتية التقنية للشركات.",
      avatar: "https://via.placeholder.com/150",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "زياد حسام الدين",
      title: "Cloud Architect",
      experience: "+9 سنوات خبرة",
      category: "البرمجة",
      description:
        "متخصص في تصميم حلول الحوسبة السحابية باستخدام AWS. أساعد الشركات على تحسين بنيتها التحتية السحابية.",
      avatar: "./mentor-images/ziad.jpg",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "نورا سعيد عبدالله",
      title: "Product Manager",
      experience: "+4 سنوات خبرة",
      category: "إدارة المنتجات",
      description:
        "خبيرة في إدارة المنتجات التقنية وتطويرها. أعمل على ربط احتياجات العملاء مع الحلول التقنية.",
      avatar:
        "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-20/noura.png",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "إياد محمد فؤاد",
      title: "Machine Learning Engineer",
      experience: "+5 سنوات خبرة",
      category: "علوم البيانات",
      description:
        "متخصص في بناء نماذج التعلم الآلي. أعمل على تطوير حلول ذكية لتحليل البيانات.",
      avatar: "./mentor-images/eyad.jpg",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "فاطمة عبدالرحمن",
      title: "Content Strategist",
      experience: "+3 سنوات خبرة",
      category: "التسويق",
      description:
        "خبيرة في إنشاء محتوى استراتيجي للعلامات التجارية. أساعد الشركات على تحسين تواجدها الرقمي.",
      avatar: "https://via.placeholder.com/150",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "عبدالرحمن خالد",
      title: "Backend Developer",
      experience: "+6 سنوات خبرة",
      category: "البرمجة",
      description:
        "مطور خلفي خبير في Python وDjango. أركز على بناء أنظمة خلفية قوية وآمنة.",
      avatar: "./mentor-images/abdulrahman.jpg",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "هدى أحمد صبري",
      title: "Graphic Designer",
      experience: "+4 سنوات خبرة",
      category: "التصميم",
      description:
        "مصممة جرافيك مبدعة في تصميم الهوية البصرية. أعمل على إنشاء تصاميم تعبر عن رؤية العلامة التجارية.",
      avatar:
        "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-20/huda.png",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "سمير محمود علي",
      title: "Business Analyst",
      experience: "+5 سنوات خبرة",
      category: "إدارة الأعمال",
      description:
        "خبير في تحليل الأعمال وتحسين العمليات. أساعد الشركات على تحقيق أهدافها الاستراتيجية.",
      avatar: "./mentor-images/sameer.jpg",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "مها خالد العنزي",
      title: "AI Researcher",
      experience: "+7 سنوات خبرة",
      category: "علوم البيانات",
      description:
        "باحثة في مجال الذكاء الاصطناعي والتعلم العميق. أعمل على تطوير تقنيات ذكية مبتكرة.",
      avatar: "https://via.placeholder.com/150",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "طارق يوسف محمد",
      title: "Frontend Developer",
      experience: "+4 سنوات خبرة",
      category: "البرمجة",
      description:
        "مطور واجهات أمامية باستخدام Vue.js. أركز على إنشاء واجهات مستخدم تفاعلية وجذابة.",
      avatar: "./mentor-images/tariq.jpg",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "أسماء عبدالمجيد",
      title: "Scrum Master",
      experience: "+5 سنوات خبرة",
      category: "إدارة المشاريع",
      description:
        "خبيرة في إدارة المشاريع باستخدام منهجية Scrum. أساعد الفرق على تحقيق الكفاءة والإنتاجية.",
      avatar:
        "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-20/asmaa.png",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "بدر ناصر الدين",
      title: "Blockchain Developer",
      experience: "+6 سنوات خبرة",
      category: "البرمجة",
      description:
        "مطور بلوكتشين خبير في العقود الذكية. أعمل على تطوير تطبيقات لامركزية آمنة.",
      avatar: "./mentor-images/badr.jpg",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
  ];

  const notificationsData = [
    {
      title: "تنبيه!",
      text: "يمكنك إضافة جلسة جديدة مع الموجه عمر أحمد فتحي.",
      avatar: "./mentor-images/omar.jpg",
      actions: [
        { label: "الإجراء الأول", primary: true },
        { label: "الإجراء الثاني", primary: false },
      ],
      variant: "icon-variant",
    },
    {
      title: "تنبيه!",
      text: "سارة علي حسن قامت بتحديث ملفها الشخصي.",
      avatar:
        "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-20/5BupekvnRw.png",
      actions: [{ label: "الإجراء", primary: true }],
      compact: true,
      variant: "icon-variant",
    },
    {
      title: "تنبيه!",
      text: "موعد جلسة مع خالد عبدالله محمد يقترب.",
      avatar: "./mentor-images/khaled.jpg",
    },
    {
      title: "تنبيه!",
      text: "يمكنك إضافة جلسة جديدة مع منى إبراهيم سالم.",
      avatar: "https://via.placeholder.com/36",
      actions: [
        { label: "الإجراء الأول", primary: true },
        { label: "الإجراء الثاني", primary: false },
      ],
    },
    {
      title: "تنبيه!",
      avatar: "https://via.placeholder.com/36",
      actions: [{ label: "الإجراء", primary: true }],
      compact: true,
      variant: "icon-variant",
    },
  ];

  const dummyUserData = {
    id: 1,
    name: "أحمد فتحي",
    email: "ahmed@example.com",
    image_url: "./ahmedphoto.webp",
    isMentor: true,
  };

  let currentMentors = [...mentorsData];
  let currentNotifications = [...notificationsData];
  let selectedCategory = "الكل";
  let searchQuery = "";
  let isAscending = true;

  initializeMentorApplicationPopup();
  initializeAuth();
  initializeSearchBar();
  initializeFilterCategories();
  initializeNotifications();
  renderMentors();
  // Initialize mentor application popup
  function initializeMentorApplicationPopup() {
    const joinAsMentorLink = document.querySelector(".join-as-mentor");
    const popupContainer = document.querySelector(
      ".mentor-application-popup-container"
    );
    const popupOverlay = document.querySelector(
      ".mentor-application-popup-overlay"
    );
    const closeBtn = document.querySelector(".mentor-application-popup-close");

    // Debugging: Check if elements are found
    console.log("joinAsMentorLink:", joinAsMentorLink);
    console.log("popupContainer:", popupContainer);
    console.log("popupOverlay:", popupOverlay);
    console.log("closeBtn:", closeBtn);

    if (!joinAsMentorLink || !popupContainer || !popupOverlay || !closeBtn) {
      console.error("Mentor application popup elements not found");
      return;
    }

    joinAsMentorLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Mentor application link clicked");
      showMentorApplicationPopup();
    });

    closeBtn.addEventListener("click", () => {
      console.log("Close button clicked");
      hideMentorApplicationPopup();
    });

    popupOverlay.addEventListener("click", () => {
      console.log("Overlay clicked");
      hideMentorApplicationPopup();
    });

    function showMentorApplicationPopup() {
      console.log("Showing mentor application popup");
      // Reset to instructions screen
      const screens = [
        "instructions",
        "joinAs",
        "penddingScreen",
        "sucssesScreen",
        "feildScreen",
      ];
      screens.forEach((screen) => {
        const element = document.getElementById(screen);
        if (element) {
          element.style.display = screen === "instructions" ? "block" : "none";
        } else {
          console.warn(`Screen element not found: ${screen}`);
        }
      });

      popupContainer.classList.add("show");
      popupContainer.style.display = "block";
      popupOverlay.classList.add("show");
      popupOverlay.style.display = "block";
    }

    function hideMentorApplicationPopup() {
      console.log("Hiding mentor application popup");
      popupContainer.classList.remove("show");
      popupContainer.style.display = "none";
      popupOverlay.classList.remove("show");
      popupOverlay.style.display = "none";

      // Reset form inputs
      const form = popupContainer.querySelector(".content_joinAs");
      if (form) {
        form.reset();
        console.log("Form reset");
      }
    }
  }

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
          showLoginPopup();
        });
      }
      currentNotifications = [];
      updateNotificationCount();
    }

    initializeLoginPopup();
  }

  function showLoginPopup() {
    const popupContainer = document.querySelector(".login-popup-container");
    const popupOverlay = document.querySelector(".login-popup-overlay");
    if (!popupContainer || !popupOverlay) {
      console.warn("Login popup elements not found");
      return;
    }

    popupContainer.classList.add("show");
    popupContainer.style.display = "flex";
    popupOverlay.classList.add("show");
    popupOverlay.style.display = "block";

    const emailInput = popupContainer.querySelector("#email");
    if (emailInput) emailInput.focus();
  }

  function hideLoginPopup() {
    const popupContainer = document.querySelector(".login-popup-container");
    const popupOverlay = document.querySelector(".login-popup-overlay");
    if (!popupContainer || !popupOverlay) return;

    popupContainer.classList.remove("show");
    popupContainer.style.display = "none";
    popupOverlay.classList.remove("show");
    popupOverlay.style.display = "none";

    const form = popupContainer.querySelector("#loginForm");
    if (form) {
      form.reset();
      const emailError = form.querySelector("#emailError");
      const passwordError = form.querySelector("#passwordError");
      if (emailError) clearError(emailError);
      if (passwordError) clearError(passwordError);
    }
  }

  function initializeLoginPopup() {
    const popupContainer = document.querySelector(".login-popup-container");
    if (!popupContainer) return;

    const closeBtn = popupContainer.querySelector(".login-popup-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", hideLoginPopup);
    }

    const popupOverlay = document.querySelector(".login-popup-overlay");
    if (popupOverlay) {
      popupOverlay.addEventListener("click", hideLoginPopup);
    }

    const signupBtn = popupContainer.querySelector("#signupBtn1");
    if (signupBtn) {
      signupBtn.addEventListener("click", () => {
        hideLoginPopup();
        window.location.href = "signup1.html";
      });
    }

    const forgetBtn = popupContainer.querySelector("#forgetBtn");
    if (forgetBtn) {
      forgetBtn.addEventListener("click", () => {
        hideLoginPopup();
        window.location.href = "passwordScreen1.html";
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector("#loginButton");
    if (loginButton) {
      loginButton.addEventListener("click", async function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");

        clearError(emailError);
        clearError(passwordError);

        let isValid = true;

        if (!validateEmail(email)) {
          showError(emailError, "البريد الإلكتروني غير صحيح");
          isValid = false;
        }

        if (!validatePassword(password)) {
          showError(passwordError, "كلمة المرور يجب أن تكون 8 أحرف على الأقل");
          isValid = false;
        }

        if (isValid) {
          console.log("Attempting login with:", { email, password });
          try {
            await window.auth.login(email, password);
            hideLoginPopup();
            window.location.reload();
          } catch (error) {
            console.error("Login failed:", error.message);
            if (error.message.includes("Invalid credentials")) {
              showError(
                passwordError,
                "البريد الإلكتروني أو كلمة المرور غير صحيحة. <a href='passwordScreen1.html'>نسيت كلمة المرور؟</a>"
              );
            } else if (error.message.includes("يرجى التحقق من رقم الهاتف")) {
              showError(passwordError, error.message);
            } else {
              showError(passwordError, "حدث خطأ: " + error.message);
            }
          }
        } else {
          scrollToFirstError(document.getElementById("loginForm"));
        }
      });
    }
  });

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

  function initializeSearchBar() {
    const searchBar = document.querySelector(".search-bar");
    const searchPlaceholder = document.querySelector(".search-placeholder");

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "search-input";
    searchInput.style.cssText = `
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      padding: 0 40px 0 0;
      background: transparent;
      color: #333333;
      font-size: 20px;
      font-weight: 400;
      line-height: 34px;
      text-align: right;
      opacity: 0;
    `;

    searchPlaceholder.parentNode.insertBefore(searchInput, searchPlaceholder);

    searchInput.addEventListener("focus", function () {
      searchPlaceholder.style.opacity = "0";
      this.style.opacity = "1";
    });

    searchInput.addEventListener("blur", function () {
      if (!this.value) {
        searchPlaceholder.style.opacity = "1";
        this.style.opacity = "0";
      }
    });

    searchInput.addEventListener("input", function () {
      searchQuery = this.value.trim().toLowerCase();
      searchPlaceholder.style.opacity = this.value ? "0" : "1";
      updateMentors();
    });

    searchPlaceholder.addEventListener("click", () => searchInput.focus());
    const searchIcon = document.querySelector(".search-icon");
    searchIcon.addEventListener("click", () => searchInput.focus());
  }

  function initializeFilterCategories() {
    const filterCategories = document.querySelectorAll(".filter-category");
    const filterContainer = document.querySelector(".filter-container");
    let isFilterVisible = true;

    filterCategories.forEach((category) => {
      category.addEventListener("click", function () {
        filterCategories.forEach((cat) => cat.classList.remove("active"));
        this.classList.add("active");
        selectedCategory = this.textContent.trim();
        updateMentors();
      });
    });

    const filterToggle = document.querySelector(".filter-toggle");
    filterToggle.addEventListener("click", () => {
      isFilterVisible = !isFilterVisible;
      filterContainer.style.display = isFilterVisible ? "flex" : "none";
    });

    const sortToggle = document.querySelector(".sort-toggle");
    sortToggle.addEventListener("click", () => {
      isAscending = !isAscending;
      currentMentors.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name, "ar");
        return isAscending ? comparison : -comparison;
      });
      renderMentors();
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

    document.querySelectorAll(".action-button").forEach((btn) => {
      btn.addEventListener("click", () => {
        console.log("Notification action clicked");
      });
    });
  }

  function renderNotifications() {
    const notificationsContainer = document.querySelector(
      ".notifications-container"
    );
    if (!notificationsContainer) {
      console.warn("Notifications container not found");
      return;
    }
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
    if (!notificationCountEl) {
      console.warn("Notification count element not found");
      return;
    }
    notificationCountEl.textContent = currentNotifications.length;
    notificationCountEl.style.display =
      currentNotifications.length > 0 ? "block" : "none";
  }

  function toggleNotifications() {
    const notificationsContainer = document.querySelector(
      ".notifications-container"
    );
    if (!notificationsContainer) {
      console.warn("Notifications container not found");
      return;
    }
    const isVisible = notificationsContainer.style.display === "block";
    notificationsContainer.style.display = isVisible ? "none" : "block";
  }

  function showMentorPopup(mentor) {
    const popupContainer = document.querySelector(".mentor-popup-container");
    const popupOverlay = document.querySelector(".mentor-popup-overlay");
    if (!popupContainer || !popupOverlay) {
      console.warn("Popup elements not found");
      return;
    }

    popupContainer.querySelector(".profile-name").textContent = mentor.name;
    popupContainer.querySelector(".profile-title").textContent = mentor.title;
    popupContainer.querySelector(".profile-bio").textContent =
      mentor.description;
    popupContainer.querySelector(".profile-image").src = mentor.avatar;

    popupContainer.classList.add("show");
    popupContainer.style.display = "flex";
    popupOverlay.classList.add("show");
    popupOverlay.style.display = "block";

    const closeBtn = popupContainer.querySelector(".mentor-popup-close");
    closeBtn.addEventListener("click", () => {
      popupContainer.classList.remove("show");
      popupContainer.style.display = "none";
      popupOverlay.classList.remove("show");
      popupOverlay.style.display = "none";
    });

    const bookBtn = popupContainer.querySelector(".button-filled");
    const profileBtn = popupContainer.querySelector(".button-outline");
    bookBtn.addEventListener("click", () => {
      console.log(`Booking session with ${mentor.name}`);
    });
    profileBtn.addEventListener("click", () => {
      console.log(`Viewing profile for ${mentor.name}`);
    });
  }

  function renderMentors() {
    const mentorsContainer = document.querySelector(".mentors-container");
    if (!mentorsContainer) {
      console.warn("Mentors container not found");
      return;
    }
    mentorsContainer.innerHTML = "";

    const mentorsToShow = currentMentors.length ? currentMentors : mentorsData;

    for (let i = 0; i < mentorsToShow.length; i += 4) {
      const row = document.createElement("div");
      row.className = "mentors-row";

      for (let j = i; j < i + 4 && j < mentorsToShow.length; j++) {
        const mentor = mentorsToShow[j];
        const card = document.createElement("article");
        card.className = "mentor-card";
        card.innerHTML = `
          <div
            class="mentor-header"
            style="background-image: url(${mentor.avatar})"
          ></div>
          <div class="mentor-content">
            <div class="mentor-name">${mentor.name}</div>
            <div class="mentor-title">${mentor.title}</div>
            <div class="mentor-experience">${mentor.experience}</div>
            <div class="mentor-social">
              ${mentor.social
                .map(
                  (icon) => `
                <div class="social-icon">
                  <div class="social-icon-img ${icon}"></div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
          <div class="mentor-actions">
            <button class="action-btn book-btn">احجز الآن</button>
            <button class="action-btn details-btn">تفاصيل</button>
          </div>
        `;

        initializeMentorCard(card, mentor);
        row.appendChild(card);
      }

      mentorsContainer.appendChild(row);
    }
  }

  function initializeMentorCard(card, mentor) {
    const bookBtn = card.querySelector(".book-btn");
    bookBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log(`Booking session with ${mentor.name}`);
    });

    const detailsBtn = card.querySelector(".details-btn");
    detailsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showMentorPopup(mentor);
    });

    card.addEventListener("click", (e) => {
      if (e.target.closest(".action-btn") || e.target.closest(".social-icon"))
        return;
      showMentorPopup(mentor);
    });

    const socialIcons = card.querySelectorAll(".social-icon");
    socialIcons.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        e.stopPropagation();
        console.log("Social icon clicked");
      });
    });
  }

  function updateMentors() {
    currentMentors = mentorsData.filter((mentor) => {
      const matchesCategory =
        selectedCategory === "الكل" || mentor.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        mentor.name.toLowerCase().includes(searchQuery) ||
        mentor.title.toLowerCase().includes(searchQuery) ||
        mentor.category.toLowerCase().includes(searchQuery) ||
        mentor.description.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });

    renderMentors();
  }
});
