// document.addEventListener("DOMContentLoaded", function () {
//   // Initialize interactive elements
//   initializeSearchBar();
//   initializeFilterCategories();
//   initializeMentorCards();
// });

// function initializeSearchBar() {
//   const searchBar = document.querySelector(".search-bar");
//   const searchPlaceholder = document.querySelector(".search-placeholder");

//   // Create actual input element
//   const searchInput = document.createElement("input");
//   searchInput.type = "text";
//   searchInput.className = "search-input";
//   searchInput.style.cssText = `
//       position: absolute;
//       width: 100%;
//       height: 100%;
//       top: 0;
//       right: 0;
//       padding: 0 40px 0 0;
//       background: transparent;
//       color: #333333;
//       font-size: 20px;
//       font-weight: 400;
//       line-height: 34px;
//       text-align: right;
//       opacity: 0;
//     `;

//   // Insert input before placeholder
//   searchPlaceholder.parentNode.insertBefore(searchInput, searchPlaceholder);

//   // Handle focus and input events
//   searchInput.addEventListener("focus", function () {
//     searchPlaceholder.style.opacity = "0";
//     this.style.opacity = "1";
//   });

//   searchInput.addEventListener("blur", function () {
//     if (!this.value) {
//       searchPlaceholder.style.opacity = "1";
//       this.style.opacity = "0";
//     }
//   });

//   searchInput.addEventListener("input", function () {
//     if (this.value) {
//       searchPlaceholder.style.opacity = "0";
//     } else {
//       searchPlaceholder.style.opacity = "1";
//     }
//   });

//   // Make the placeholder clickable to focus the input
//   searchPlaceholder.addEventListener("click", function () {
//     searchInput.focus();
//   });

//   // Make the search icon clickable to focus the input
//   const searchIcon = document.querySelector(".search-icon");
//   searchIcon.addEventListener("click", function () {
//     searchInput.focus();
//   });
// }

// function initializeFilterCategories() {
//   const filterCategories = document.querySelectorAll(".filter-category");

//   filterCategories.forEach((category) => {
//     category.addEventListener("click", function () {
//       // Remove active class from all categories
//       filterCategories.forEach((cat) => cat.classList.remove("active"));

//       // Add active class to clicked category
//       this.classList.add("active");

//       // Here you would typically filter the mentors based on the selected category
//       // For demonstration, we'll just log the selected category
//       console.log("Selected category:", this.textContent.trim());
//     });
//   });

//   // Filter toggle functionality
//   const filterToggle = document.querySelector(".filter-toggle");
//   filterToggle.addEventListener("click", function () {
//     // Here you would typically show/hide additional filter options
//     console.log("Filter toggle clicked");
//   });

//   // Sort toggle functionality
//   const sortToggle = document.querySelector(".sort-toggle");
//   sortToggle.addEventListener("click", function () {
//     // Here you would typically show sorting options or toggle sort order
//     console.log("Sort toggle clicked");
//   });
// }

// function initializeMentorCards() {
//   const mentorCards = document.querySelectorAll(".mentor-card");

//   mentorCards.forEach((card) => {
//     // Add hover effect
//     card.addEventListener("mouseenter", function () {
//       this.style.transform = "translateY(-5px)";
//       this.style.boxShadow = "0 20px 40px 0 rgba(88, 92, 95, 0.15)";
//     });

//     card.addEventListener("mouseleave", function () {
//       this.style.transform = "";
//       this.style.boxShadow = "";
//     });

//     // Book button functionality
//     const bookBtn = card.querySelector(".book-btn");
//     bookBtn.addEventListener("click", function (e) {
//       e.stopPropagation();
//       const mentorName = card.querySelector(".mentor-name").textContent;
//       console.log(`Booking session with ${mentorName}`);
//       // Here you would typically open a booking modal or navigate to booking page
//     });

//     // Details button functionality
//     const detailsBtn = card.querySelector(".details-btn");
//     detailsBtn.addEventListener("click", function (e) {
//       e.stopPropagation();
//       const mentorName = card.querySelector(".mentor-name").textContent;
//       console.log(`Viewing details for ${mentorName}`);
//       // Here you would typically navigate to mentor details page
//     });

//     // Make the entire card clickable to view details
//     card.addEventListener("click", function () {
//       const mentorName = this.querySelector(".mentor-name").textContent;
//       console.log(`Viewing details for ${mentorName}`);
//       // Here you would typically navigate to mentor details page
//     });

//     // Social icons functionality
//     const socialIcons = card.querySelectorAll(".social-icon");
//     socialIcons.forEach((icon) => {
//       icon.addEventListener("click", function (e) {
//         e.stopPropagation();
//         console.log("Social icon clicked");
//         // Here you would typically open the corresponding social media profile
//       });
//     });
//   });
// }
// document.addEventListener("DOMContentLoaded", function () {
//   // Simulated mentor data
//   const mentorsData = [
//     {
//       name: "معتصم شعبان",
//       title: "Product Designer",
//       experience: "+5 سنوات خبرة",
//       category: "التصميم",
//       description:
//         "ذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من",
//       avatar:
//         "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-20/rqkD9Mfi2w.png",
//       social: ["social-icon-1", "social-icon-2", "social-icon-3"],
//     },
//     {
//       name: "أحمد محمد",
//       title: "Software Engineer",
//       experience: "+7 سنوات خبرة",
//       category: "البرمجة",
//       description: "مبرمج متمرس مع خبرة واسعة في تطوير التطبيقات",
//       avatar:
//         "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-20/hESPXuGKQc.png",
//       social: ["social-icon-4", "social-icon-5", "social-icon-6"],
//     },
//     {
//       name: "سارة علي",
//       title: "HR Specialist",
//       experience: "+3 سنوات خبرة",
//       category: "HR",
//       description: "خبيرة في إدارة الموارد البشرية والتطوير التنظيمي",
//       avatar:
//         "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-20/5BupekvnRw.png",
//       social: ["social-icon-7", "social-icon-8", "social-icon-9"],
//     },
//   ];

//   // Dummy mentor data for logged-in user (consistent with MentorPage.js)
//   const dummyMentorData = {
//     name: "أحمد فتحي",
//     image_url: "./mentor-images/freepik__adjust__7471.svg",
//   };

//   let currentMentors = [...mentorsData];
//   let selectedCategory = "الكل";
//   let searchQuery = "";

//   // Initialize page
//   initializeAuth();
//   initializeSearchBar();
//   initializeFilterCategories();
//   renderMentors();

//   function initializeAuth() {
//     const authSection = document.querySelector(".auth-section");
//     const accessToken = localStorage.getItem("accessToken");

//     if (accessToken) {
//       // Logged-in state
//       authSection.innerHTML = `
//         <div class="left_Sec">
//           <a class="titel" href="./mentor-veiw.html">
//             <img
//               id="image2"
//               src="${dummyMentorData.image_url}"
//               alt="صورة المرشد"
//               style="width: 60px; height: 60px; border-radius: 50%"
//             />
//             <p class="mentor_name">${dummyMentorData.name}</p>
//           </a>
//           <div class="buttonsNav">
//             <button class="notBtn" aria-label="الإشعارات">
//               <img src="./mentor-images/notification.svg" alt="إشعارات" />
//             </button>
//             <button class="messageBtn" aria-label="الرسائل">
//               <img src="./mentor-images/messages-2.svg" alt="رسائل" />
//             </button>
//           </div>
//         </div>
//       `;
//     } else {
//       // Logged-out state
//       authSection.innerHTML = `
//         <div class="auth-group">
//           <button class="signup-btn">انشاء حساب جديد</button>
//           <button class="login-btn">تسجيل الدخول</button>
//         </div>
//       `;
//     }

//     // Add event listeners for auth buttons
//     const signupBtn = (authSection.querysilly_artifact_id =
//       "7b8e3f2a-9c7d-4e2b-8f5a-6b2d8c1e4a7c".querySelector(".signup-btn"));
//     const loginBtn = authSection.querySelector(".login-btn");

//     if (signupBtn) {
//       signupBtn.addEventListener("click", () => {
//         window.location.href = "signup1.html";
//       });
//     }

//     if (loginBtn) {
//       loginBtn.addEventListener("click", () => {
//         window.location.href = "index.html";
//       });
//     }
//   }

//   function initializeSearchBar() {
//     const searchBar = document.querySelector(".search-bar");
//     const searchPlaceholder = document.querySelector(".search-placeholder");

//     const searchInput = document.createElement("input");
//     searchInput.type = "text";
//     searchInput.className = "search-input";
//     searchInput.style.cssText = `
//       position: absolute;
//       width: 100%;
//       height: 100%;
//       top: 0;
//       right: 0;
//       padding: 0 40px 0 0;
//       background: transparent;
//       color: #333333;
//       font-size: 20px;
//       font-weight: 400;
//       line-height: 34px;
//       text-align: right;
//       opacity: 0;
//     `;

//     searchPlaceholder.parentNode.insertBefore(searchInput, searchPlaceholder);

//     searchInput.addEventListener("focus", function () {
//       searchPlaceholder.style.opacity = "0";
//       this.style.opacity = "1";
//     });

//     searchInput.addEventListener("blur", function () {
//       if (!this.value) {
//         searchPlaceholder.style.opacity = "1";
//         this.style.opacity = "0";
//       }
//     });

//     searchInput.addEventListener("input", function () {
//       searchQuery = this.value.trim().toLowerCase();
//       searchPlaceholder.style.opacity = this.value ? "0" : "1";
//       updateMentors();
//     });

//     searchPlaceholder.addEventListener("click", () => searchInput.focus());
//     const searchIcon = document.querySelector(".search-icon");
//     searchIcon.addEventListener("click", () => searchInput.focus());
//   }

//   function initializeFilterCategories() {
//     const filterCategories = document.querySelectorAll(".filter-category");

//     filterCategories.forEach((category) => {
//       category.addEventListener("click", function () {
//         filterCategories.forEach((cat) => cat.classList.remove("active"));
//         this.classList.add("active");
//         selectedCategory = this.textContent.trim();
//         updateMentors();
//       });
//     });

//     const filterToggle = document.querySelector(".filter-toggle");
//     filterToggle.addEventListener("click", () => {
//       console.log("Filter toggle clicked");
//     });

//     const sortToggle = document.querySelector(".sort-toggle");
//     sortToggle.addEventListener("click", () => {
//       console.log("Sort toggle clicked");
//     });
//   }

//   function renderMentors() {
//     const mentorsContainer = document.querySelector(".mentors-container");
//     mentorsContainer.innerHTML = "";

//     const mentorsToShow = currentMentors.length ? currentMentors : mentorsData;

//     for (let i = 0; i < mentorsToShow.length; i += 4) {
//       const row = document.createElement("div");
//       row.className = "mentors-row";

//       for (let j = i; j < i + 4 && j < mentorsToShow.length; j++) {
//         const mentor = mentorsToShow[j];
//         const card = document.createElement("article");
//         card.className = "mentor-card";
//         card.innerHTML = `
//           <div class="mentor-header">
//             <div class="mentor-profile">
//               <div class="mentor-avatar" style="background-image: url(${
//                 mentor.avatar
//               })"></div>
//               <h3 class="mentor-name">${mentor.name}</h3>
//               <p class="mentor-title">${mentor.title}</p>
//               <div class="mentor-experience">
//                 <span class="experience-text">${mentor.experience}</span>
//               </div>
//             </div>
//             <div class="mentor-social">
//               ${mentor.social
//                 .map(
//                   (icon) => `
//                 <div class="social-icon">
//                   <div class="social-icon-img ${icon}"></div>
//                 </div>
//               `
//                 )
//                 .join("")}
//             </div>
//           </div>
//           <div class="mentor-content">
//             <p class="mentor-description">${mentor.description}</p>
//             <div class="mentor-actions">
//               <button class="action-btn book-btn">احجز الان</button>
//               <button class="action-btn details-btn">تفاصيل</button>
//             </div>
//           </div>
//         `;

//         initializeMentorCard(card, mentor);
//         row.appendChild(card);
//       }

//       mentorsContainer.appendChild(row);
//     }
//   }

//   function initializeMentorCard(card, mentor) {
//     card.addEventListener("mouseenter", function () {
//       this.style.transform = "translateY(-5px)";
//       this.style.boxShadow = "0 20px 40px 0 rgba(88, 92, 95, 0.15)";
//     });

//     card.addEventListener("mouseleave", function () {
//       this.style.transform = "";
//       this.style.boxShadow = "";
//     });

//     const bookBtn = card.querySelector(".book-btn");
//     bookBtn.addEventListener("click", (e) => {
//       e.stopPropagation();
//       console.log(`Booking session with ${mentor.name}`);
//     });

//     const detailsBtn = card.querySelector(".details-btn");
//     detailsBtn.addEventListener("click", (e) => {
//       e.stopPropagation();
//       console.log(`Viewing details for ${mentor.name}`);
//     });

//     card.addEventListener("click", () => {
//       console.log(`Viewing details for ${mentor.name}`);
//     });

//     const socialIcons = card.querySelectorAll(".social-icon");
//     socialIcons.forEach((icon) => {
//       icon.addEventListener("click", (e) => {
//         e.stopPropagation();
//         console.log("Social icon clicked");
//       });
//     });
//   }

//   function updateMentors() {
//     currentMentors = mentorsData.filter((mentor) => {
//       const matchesCategory =
//         selectedCategory === "الكل" || mentor.category === selectedCategory;
//       const matchesSearch =
//         !searchQuery ||
//         mentor.name.toLowerCase().includes(searchQuery) ||
//         mentor.title.toLowerCase().includes(searchQuery) ||
//         mentor.category.toLowerCase().includes(searchQuery);
//       return matchesCategory && matchesSearch;
//     });

//     renderMentors();
//   }
// });
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
  ];

  // Dummy mentor data for logged-in user
  const dummyMentorData = {
    name: "أحمد فتحي",
    image_url: "./mentor-images/freepik__adjust__7471.svg",
  };

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
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      // Logged-in state
      authSection.innerHTML = `
        <a class="titel" href="./mentor-veiw.html">
          <img
            src="${dummyMentorData.image_url}"
            alt="صورة المرشد"
            style="width: 60px; height: 60px; border-radius: 50%"
          />
          <p class="mentor_name">${dummyMentorData.name}</p>
        </a>
        <div class="buttonsNav">
        <button class="messageBtn" aria-label="الرسائل">
          <img src="./mentor-images/messages-2.svg" alt="رسائل" />
        </button>
          <button class="notBtn" aria-label="الإشعارات">
            <img src="./mentor-images/notification.svg" alt="إشعارات" />
          </button>
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
        window.location.href = "signup1.html";
      });
    }

    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        window.location.href = "index.html";
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
    });

    const sortToggle = document.querySelector(".sort-toggle");
    sortToggle.addEventListener("click", () => {
      console.log("Sort toggle clicked");
    });
  }

  function renderMentors() {
    const mentorsContainer = document.querySelector(".mentors-container");
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
    });

    const detailsBtn = card.querySelector(".details-btn");
    detailsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log(`Viewing details for ${mentor.name}`);
    });

    card.addEventListener("click", () => {
      console.log(`Viewing details for ${mentor.name}`);
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
        mentor.category.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });

    renderMentors();
  }
});
