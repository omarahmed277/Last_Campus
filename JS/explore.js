document.addEventListener("DOMContentLoaded", function () {
  const mentorsData = [
    {
      name: "عمر أحمد فتحي",
      title: "Full Stack Developer",
      experience: "+5 سنوات خبرة",
      category: "البرمجة",
      description:
        "خبير في تطوير تطبيقات الويب باستخدام JavaScript وNode.js. أحب البحث عن حلول مبتكرة وأمتلك خبرة قوية في تصميم وتطوير تطبيقات متكاملة.",
      avatar: "./assets/omar.jpg",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "سارة علي حسن",
      title: "HR Specialist",
      experience: "+3 سنوات خبرة",
      category: "الموارد البشرية",
      description:
        "متخصصة في إدارة الموارد البشرية والتطوير التنظيمي. أمتلك خبرة في توظيف المواهب وتطوير استراتيجيات تعزز بيئة العمل.",
      avatar: "./mentor-images/mentor2.jpg",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "خالد عبدالله محمد",
      title: "Data Scientist",
      experience: "+4 سنوات خبرة",
      category: "علوم البيانات",
      description:
        "خبير في تحليل البيانات وتطبيقات الذكاء الاصطناعي. أعمل على بناء نماذج تحليلية تساعد الشركات على اتخاذ قرارات استراتيجية.",
      avatar: "./mentor-images/mentor1.jpg",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "منى إبراهيم سالم",
      title: "UI/UX Designer",
      experience: "+6 سنوات خبرة",
      category: "التصميم",
      description:
        "متخصصة في تصميم واجهات المستخدم وتجربة المستخدم. أحب إنشاء تصاميم جذابة وسهلة الاستخدام تعزز تجربة المستخدم.",
      avatar: "./mentor-images/mentor3.jpg",
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

  let currentMentors = [...mentorsData];
  let currentNotifications = [...notificationsData];
  let selectedCategory = "الكل";
  let searchQuery = "";
  let isAscending = true;

  initializePage();

  function initializePage() {
    const authSection = document.querySelector(".auth-section");
    common.initializeAuth(
      authSection,
      currentNotifications,
      common.showLoginPopup,
      common.showSignupPopup,
      common.toggleNotifications,
      () => common.updateNotificationCount(currentNotifications)
    );
    common.initializeLoginPopup(common.showSignupPopup);
    common.initializeMentorApplicationPopup();
    initializeSearchBar();
    initializeFilterCategories();
    common.renderNotifications(currentNotifications, () =>
      common.updateNotificationCount(currentNotifications)
    );
    renderMentors();
    common.initializeSignupPopup();
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
          <div class="mentor-header" style="background-image: url(${
            mentor.avatar
          })"></div>
          <div class="mentor-content">
            <div class="mentor-name">${mentor.name}</div>
            <div class="mentor-title">${mentor.title}</div>
            <div class="mentor-experience">${mentor.experience}</div>
            <div class="mentor-social">
              ${mentor.social
                .map(
                  (icon) =>
                    `<div class="social-icon"><div class="social-icon-img ${icon}"></div></div>`
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
