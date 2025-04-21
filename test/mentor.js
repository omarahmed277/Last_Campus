document.addEventListener("DOMContentLoaded", function () {
  // Simulated mentor data
  const mentorsData = [
    {
      name: "معتصم شعبان",
      title: "Product Designer",
      experience: "+5 سنوات خبرة",
      category: "التصميم",
      description:
        "ذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من",
      avatar:
        "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-20/rqkD9Mfi2w.png",
      social: ["social-icon-1", "social-icon-2", "social-icon-3"],
    },
    {
      name: "أحمد محمد",
      title: "Software Engineer",
      experience: "+7 سنوات خبرة",
      category: "البرمجة",
      description: "مبرمج متمرس مع خبرة واسعة في تطوير التطبيقات",
      avatar:
        "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-20/hESPXuGKQc.png",
      social: ["social-icon-4", "social-icon-5", "social-icon-6"],
    },
    {
      name: "سارة علي",
      title: "HR Specialist",
      experience: "+3 سنوات خبرة",
      category: "HR",
      description: "خبيرة في إدارة الموارد البشرية والتطوير التنظيمي",
      avatar:
        "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-20/5BupekvnRw.png",
      social: ["social-icon-7", "social-icon-8", "social-icon-9"],
    },
    // Add more mentors as needed
  ];

  let currentMentors = [...mentorsData];
  let selectedCategory = "الكل";
  let searchQuery = "";

  // Initialize page
  initializeAuth();
  initializeSearchBar();
  initializeFilterCategories();
  renderMentors();

  function initializeAuth() {
    const authSection = document.querySelector(".auth-section");
    const accessToken = localStorage.getItem("authToken"); // Simulated token check

    if (accessToken) {
      // Logged-in state
      authSection.innerHTML = `
        <div class="left_Sec">
          <a class="titel" href="#">
            <img
              id="image2"
              src="./mentor-images/freepik__adjust__7471.svg"
              alt="صورة المرشد"
              style="width: 60px; height: 60px; border-radius: 50%"
            />
            <p class="mentor_name">المرشد الأول</p>
          </a>
          <div class="buttonsNav">
            <button class="notBtn" aria-label="الإشعارات">
              <img src="./mentor-images/notification.svg" alt="إشعارات" />
            </button>
            <button class="messageBtn" aria-label="الرسائل">
              <img src="./mentor-images/messages-2.svg" alt="رسائل" />
            </button>
          </div>
        </div>
      `;
    } else {
      // Logged-out state
      authSection.innerHTML = `
        <div class="auth-group">
          <button class="signup-btn">انشاء حساب جديد</button>
          <button class="login-btn">تسجيل الدخول</button>
        </div>
      `;
    }

    // Add event listeners for auth buttons
    const signupBtn = authSection.querySelector(".signup-btn");
    const loginBtn = authSection.querySelector(".login-btn");

    if (signupBtn) {
      signupBtn.addEventListener("click", () => {
        console.log("Navigate to signup page");
        // Simulate signup by setting token
        localStorage.setItem("accessToken", "dummy-token");
        initializeAuth();
      });
    }

    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        console.log("Navigate to login page");
        // Simulate login by setting token
        localStorage.setItem("accessToken", "dummy-token");
        initializeAuth();
      });
    }
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
      console.log("Filter toggle clicked");
      // Add logic to show/hide filter options if needed
    });

    const sortToggle = document.querySelector(".sort-toggle");
    sortToggle.addEventListener("click", () => {
      console.log("Sort toggle clicked");
      // Add sorting logic if needed
    });
  }

  function renderMentors() {
    const mentorsContainer = document.querySelector(".mentors-container");
    mentorsContainer.innerHTML = "";

    const mentorsToShow = currentMentors.length ? currentMentors : mentorsData;

    // Group mentors into rows of 4
    for (let i = 0; i < mentorsToShow.length; i += 4) {
      const row = document.createElement("div");
      row.className = "mentors-row";

      for (let j = i; j < i + 4 && j < mentorsToShow.length; j++) {
        const mentor = mentorsToShow[j];
        const card = document.createElement("article");
        card.className = "mentor-card";
        card.innerHTML = `
          <div class="mentor-header">
            <div class="mentor-profile">
              <div class="mentor-avatar" style="background-image: url(${
                mentor.avatar
              })"></div>
              <h3 class="mentor-name">${mentor.name}</h3>
              <p class="mentor-title">${mentor.title}</p>
              <div class="mentor-experience">
                <span class="experience-text">${mentor.experience}</span>
              </div>
            </div>
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
          <div class="mentor-content">
            <p class="mentor-description">${mentor.description}</p>
            <div class="mentor-actions">
              <button class="action-btn book-btn">احجز الان</button>
              <button class="action-btn details-btn">تفاصيل</button>
            </div>
          </div>
        `;

        // Add event listeners to card
        initializeMentorCard(card, mentor);
        row.appendChild(card);
      }

      mentorsContainer.appendChild(row);
    }
  }

  function initializeMentorCard(card, mentor) {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 20px 40px 0 rgba(88, 92, 95, 0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });

    const bookBtn = card.querySelector(".book-btn");
    bookBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log(`Booking session with ${mentor.name}`);
      // Add booking logic
    });

    const detailsBtn = card.querySelector(".details-btn");
    detailsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log(`Viewing details for ${mentor.name}`);
      // Add navigation to details page
    });

    card.addEventListener("click", () => {
      console.log(`Viewing details for ${mentor.name}`);
      // Add navigation to details page
    });

    const socialIcons = card.querySelectorAll(".social-icon");
    socialIcons.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        e.stopPropagation();
        console.log("Social icon clicked");
        // Add social media link logic
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
        mentor.category.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });

    renderMentors();
  }
});
