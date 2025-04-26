// Unified dummy user data (for navigation bar)
const dummyUserData = {
  id: 1,
  name: "أحمد فتحي",
  email: "ahmed@example.com",
  image_url: "./ahmedphoto.webp",
  isMentor: true,
};

// Dummy mentor data (provided)
const dummyMentorData = {
  success: true,
  message: "User retrieved successfully.",
  data: {
    id: 1,
    name: "أحمد فتحي",
    email: "ahmed@example.com",
    phone: "01012345678",
    gender: "MALE",
    country: "مصر",
    specialization: "أخصائي تسويق",
    experienceLevel: "INTERMEDIATE",
    bio: "أخصائي تسويق مبتدئ في مسرعة أثر مع سنتين من الخبرة في مجال التسويق...",
    isMentor: true,
    image_url: "./ahmedphoto.webp",
    background_image_url: "./ahmed.jpeg",
    video_url: "",
    totalSessions: 42,
    totalMinutes: 2200,
    linkedin: "https://linkedin.com/in/ahmed-mohamed",
    behance: "https://behance.net/ahmed-mohamed",
    github: "https://github.com/ahmed-mohamed",
    instagram: "https://instagram.com/ahmed.mohamed",
    experiences: [
      {
        id: 1,
        jobTitle: "مطور ويب",
        companyName: "شركة التقنية",
        startDate: "2020-01-01",
        endDate: "2022-12-31",
        currentlyWorking: false,
        description: "تطوير وتصميم تطبيقات الويب باستخدام React وNode.js",
      },
      {
        id: 2,
        jobTitle: "مطور أول",
        companyName: "شركة الحلول الذكية",
        startDate: "2023-01-01",
        endDate: null,
        currentlyWorking: true,
        description: "قيادة فريق تطوير وبناء معمارية التطبيقات",
      },
    ],
    certificates: [
      {
        id: 1,
        name: "شهادة React المتقدمة",
        image_url:
          "https://i.pinimg.com/736x/18/c6/e0/18c6e05ccc51b8e8e8385d0b38105d83.jpg",
        issuingAuthority: "منصة Udemy",
        issueDate: "2021-05-15",
        certificateNumber: "UD123456",
        certificateLink: "https://udemy.com/certificate/UD123456",
      },
      {
        id: 2,
        name: "شهادة Node.js",
        image_url:
          "https://i.pinimg.com/736x/7c/fe/15/7cfe15d39a12fe100716b75c0e2bb7e2.jpg",
        issuingAuthority: "منصة Coursera",
        issueDate: "2022-03-10",
        certificateNumber: "CR789012",
        certificateLink: "https://coursera.org/certificate/CR789012",
      },
      {
        id: 3,
        name: "شهادة JavaScript",
        image_url:
          "https://i.pinimg.com/736x/18/c6/e0/18c6e05ccc51b8e8e8385d0b38105d83.jpg",
        issuingAuthority: "منصة FreeCodeCamp",
        issueDate: "2020-12-01",
        certificateNumber: "FCC654321",
        certificateLink: "https://freecodecamp.org/certificate/FCC654321",
      },
    ],
    education: [
      {
        id: 1,
        institution: "جامعة القاهرة",
        degree: "بكالوريوس هندسة الحاسبات",
        startDate: "2015-09-01",
        endDate: "2019-06-30",
      },
      {
        id: 2,
        institution: "معهد تكنولوجيا المعلومات",
        degree: "دبلومة تطوير الويب",
        startDate: "2020-01-15",
        endDate: "2020-07-15",
      },
    ],
    ratings: {
      averageRating: 4.7,
      totalRatings: 28,
      ratingDistribution: {
        5: 18,
        4: 7,
        3: 2,
        2: 1,
        1: 0,
      },
      reviews: [
        {
          id: 1,
          menteeName: "محمد علي",
          menteeImage: "./user1.jpg",
          rating: 5,
          date: "2023-10-15",
          comment:
            "جلسة رائعة جداً، أحمد خبير في مجاله وقدم لي نصائح قيمة ساعدتني في تطوير مشروعي.",
        },
        {
          id: 2,
          menteeName: "سارة محمود",
          menteeImage: "./user2.jpg",
          rating: 1.5,
          date: "2023-09-22",
          comment:
            "جلسة مفيدة ولكن أتمنى لو كانت أطول قليلاً. أحمد يعرف ما يتحدث عنه.",
        },
        {
          id: 3,
          menteeName: "خالد عبدالله",
          menteeImage: "./user3.jpg",
          rating: 5,
          date: "2023-08-05",
          comment: "أفضل مرشد تعاملت معه! شرح كل شيء بطريقة واضحة وسهلة الفهم.",
        },
      ],
    },
    achievements: [
      {
        id: 1,
        title: "أول 10 جلسات إرشادية",
        description: "إكمال أول 10 جلسات إرشادية بنجاح",
        date: "2023-03-15",
        icon: "./mentor-images/sessionRate-image.png",
        unlocked: true,
      },
      {
        id: 2,
        title: "خبير التفاعل",
        description: "الحصول على معدل تقييم 4.5+ من 20 جلسة",
        date: "2023-06-20",
        icon: "./Trophy.jpeg",
        unlocked: true,
      },
      {
        id: 3,
        title: "الإرشاد المتميز",
        description: "التوصية من قبل 5 من المستفيدين",
        date: "2023-08-10",
        icon: "./achievement3.jpeg",
        unlocked: true,
      },
      {
        id: 4,
        title: "100 ساعة إرشاد",
        description: "إكمال 100 ساعة إرشادية",
        date: null,
        icon: "./achievement4.svg",
        unlocked: false,
        progress: 78,
      },
      {
        id: 5,
        title: "الإرشاد الذهبي",
        description: "الحصول على 50 تقييم 5 نجوم",
        date: null,
        icon: "./achievement5.svg",
        unlocked: false,
        progress: 36,
      },
    ],
    createdAt: "2023-01-15T10:30:00.000Z",
    updatedAt: "2023-06-20T14:45:00.000Z",
  },
};

// Simulated notifications data
const notificationsData = [
  {
    title: "تنبيه!",
    text: "تم تأكيد جلسة جديدة مع أحمد فتحي.",
    avatar: "./ahmedphoto.webp",
    actions: [
      { label: "عرض التفاصيل", primary: true },
      { label: "إغلاق", primary: false },
    ],
    variant: "icon-variant",
  },
  {
    title: "تنبيه!",
    text: "تم تحديث ملفك الشخصي بنجاح.",
    avatar: "./ahmedphoto.webp",
    actions: [{ label: "عرض", primary: true }],
    compact: true,
    variant: "icon-variant",
  },
];

// Utility Functions
function checkInputDirection(input) {
  const value = input.value;
  input.style.direction = /[\u0600-\u06FF]/.test(value) ? "rtl" : "ltr";
  input.style.textAlign = /[\u0600-\u06FF]/.test(value) ? "right" : "left";
}

function formatDate(dateString) {
  if (!dateString) return "الحالي";
  const date = new Date(dateString);
  return date.toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isValidUrl(string, pattern) {
  try {
    const url = new URL(string);
    return pattern ? pattern.test(string) : true;
  } catch (_) {
    return false;
  }
}

function showError(field, message) {
  const errorElement = document.getElementById(`${field.id}Error`);
  if (errorElement) {
    errorElement.textContent = message;
    field.classList.add("error-border");
  }
}

function clearErrors(form) {
  const errorElements = form.querySelectorAll(".error");
  errorElements.forEach((el) => (el.textContent = ""));
  const fields = form.querySelectorAll(".error-border");
  fields.forEach((field) => field.classList.remove("error-border"));
}

function validateForm(formId) {
  const form = document.getElementById(formId);
  let isValid = true;
  clearErrors(form);

  const requiredFields = form.querySelectorAll("[required]");
  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      showError(field, "هذا الحقل مطلوب");
      isValid = false;
    } else if (field.type === "url" && field.pattern) {
      if (!isValidUrl(field.value, new RegExp(field.pattern))) {
        showError(field, "الرجاء إدخال رابط صحيح");
        isValid = false;
      }
    } else if (field.id === "about_me" && field.value.length < 20) {
      showError(field, "يجب أن تحتوي النبذة على 20 حرف على الأقل");
      isValid = false;
    } else if (field.classList.contains("date-end") && field.value) {
      const startDateInput = form.querySelector(`[data-pair="${field.id}"]`);
      if (startDateInput && startDateInput.value) {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(field.value);
        if (endDate < startDate) {
          showError(field, "تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء");
          isValid = false;
        }
      }
    }
  });

  return isValid;
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
    modal.focus();
  } else {
    console.error(`Modal with ID ${modalId} not found`);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
    const form = modal.querySelector("form");
    if (form) {
      form.reset();
      delete form.dataset.editId;
      clearErrors(form);
    }
  } else {
    console.error(`Modal with ID ${modalId} not found`);
  }
}

function getUserIdFromAuthToken() {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    console.log("No authToken found in local storage");
    return null;
  }
  try {
    const payload = JSON.parse(atob(authToken.split(".")[1]));
    return payload.id || payload.userId || payload.sub || null;
  } catch (error) {
    console.error("Error decoding authToken:", error);
    return null;
  }
}

function sanitizeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Authentication Initialization
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
                notificationsData.length
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
    notificationsData.length = 0;
    updateNotificationCount();
  }
}

async function fetchUserData(token) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyUserData);
    }, 500);
  });
}

// Populate Functions
function populatePageWithMentorData(data) {
  document
    .querySelectorAll(".mentor_name")
    .forEach((el) => (el.textContent = data.name || ""));
  document.getElementById("mentor_jop").textContent = data.specialization || "";
  document.getElementById("mentorBio").textContent = data.bio || "";
  if (data.image_url) {
    document.getElementById("image1").src = data.image_url;
    document.getElementById("image2").src = data.image_url;
    document.getElementById("profileImagePreview").src = data.image_url;
  }
  if (data.background_image_url) {
    document.getElementById("background_image").src = data.background_image_url;
  }
  if (data.video_url) {
    const videoPlayer = document.getElementById("videoPlayer");
    videoPlayer.src = data.video_url;
    videoPlayer.style.display = "block";
    document.getElementById("uplodimage").style.display = "none";
    document.getElementById("uplodeBtn").style.display = "none";
    document.getElementById("size").style.display = "none";
  }
  document.getElementById("totalMinutes").textContent = `${
    data.totalMinutes || 0
  } دقيقة`;
  document.getElementById("totalSessions").textContent =
    data.totalSessions || 0;
  updateSocialLinks(data);
  populateDynamicSections(data);
  populateEditForms(data);
  populateRatingTab(data);
  populateAchievementsTab(data);
}

function updateSocialLinks(data) {
  const links = [
    { id: "linkedinLink", url: data.linkedin },
    { id: "behanceLink", url: data.behance },
    { id: "githubLink", url: data.github },
    { id: "instagramLink", url: data.instagram },
  ];
  links.forEach(({ id, url }) => {
    const link = document.getElementById(id);
    if (url) {
      link.href = url;
      link.style.display = "inline";
    } else {
      link.style.display = "none";
    }
  });
}

function populateEditForms(data) {
  document.getElementById("mentor_name").value = data.name || "";
  document.getElementById("about_me").value = data.bio || "";
  document.getElementById("gender").value = data.gender || "";
  document.getElementById("country").value = data.country || "";
  document.getElementById("linkedin").value = data.linkedin || "";
  document.getElementById("behance").value = data.behance || "";
  document.getElementById("github").value = data.github || "";
  document.getElementById("instagram").value = data.instagram || "";
}

function populateDynamicSections(data) {
  populateExperiences(data.experiences);
  populateCertificates(data.certificates);
  populateEducation(data.education);
}

function populateRatingTab(data) {
  const ratingData = data.ratings;
  const ratingContainer = document.getElementById("ratingContent");

  ratingContainer.innerHTML = "";

  const reviewsHtml = ratingData.reviews
    .map((review, index) => {
      const starsHtml = generateStars(review.rating);
      const formattedDate = new Date(review.date).toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const likes = Math.floor(Math.random() * 10) / 10;

      return `
        <div class="session${index + 1} sessionsFormat">
          <div class="session_con">
            <img class="menteePhoto" src="${review.menteeImage}" alt="${
        review.menteeName
      }" />
            <div class="time timeR">
              <h4>${review.menteeName}</h4>
              <p>${review.comment}</p>
              <div class="stars_con">
                <p>${review.rating.toFixed(1)}</p>
                <div class="stars">
                  ${starsHtml}
                </div>
              </div>
            </div>
            <div class="rette-con">
              <div class="ratte">
                <span>
                  <p>${likes.toFixed(1)}</p>
                  <img src="./mentor-images/hand-thumb-up.svg" alt="Likes" />
                </span>
                <span>
                  <p>رد</p>
                  <img src="./mentor-images/chat-bubble-oval-left-ellipsis.svg" alt="Reply" />
                </span>
              </div>
              <div class="date dateR">
                <p>${formattedDate}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  ratingContainer.innerHTML = reviewsHtml;
}

function generateStars(rating) {
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - filledStars - halfStar;

  return `
    ${'<img src="./mentor-images/ic_baseline-star.svg" alt="Filled Star" />'.repeat(
      filledStars
    )}
    ${
      halfStar
        ? '<img src="./mentor-images/IcBaselineStarHalf.svg" alt="Half Star" />'
        : ""
    }
    ${'<img src="./mentor-images/ic_baseline-star (1).svg" alt="Empty Star" />'.repeat(
      emptyStars
    )}
  `;
}

function populateAchievementsTab(data) {
  const achievementsContainer = document.getElementById("achievementsContent");
  if (!achievementsContainer) {
    console.error("Achievements container not found");
    return;
  }

  if (!data || !Array.isArray(data.achievements)) {
    console.error("Invalid or missing achievements data");
    achievementsContainer.innerHTML = "<p>خطأ في تحميل الإنجازات</p>";
    return;
  }

  achievementsContainer.innerHTML = `
    <div class="sessionSuccess_con">
      ${data.achievements
        .map((achievement) => {
          const iconSrc = achievement.icon || "./default-achievement.svg";
          const progress = achievement.unlocked
            ? 100
            : achievement.progress || 0;

          return `
            <div class="session1 sessionsFormat ${
              achievement.unlocked ? "unlocked" : "locked"
            }">
              <div class="session_con">
                <img class="AchievementPhoto" src="${iconSrc}" alt="${
            achievement.title || "إنجاز"
          }" />
                <div class="time">
                  <h4>${achievement.title || "بدون عنوان"}</h4>
                  <p>${achievement.description || "بدون وصف"}</p>
                </div>
              </div>
              ${
                achievement.unlocked
                  ? `<div class="date">
                      <p>${formatDate(achievement.date)}</p>
                    </div>`
                  : `<div class="progress">
                      <progress value="${progress}" max="100"></progress>
                      <span>${progress}%</span>
                    </div>`
              }
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function populateExperiences(experiences) {
  const container = document.getElementById("experiencesContainer");
  const listContainer = document.getElementById("experienceList");
  container.innerHTML = "";
  listContainer.innerHTML = "";

  experiences.forEach((exp) => {
    const experienceElement = document.createElement("div");
    experienceElement.className = "second_con";
    experienceElement.innerHTML = `
      <div class="veiw_con">
        <img src="./mentor-images/briefcase.svg" alt="أيقونة عمل">
        <div class="text">
          <h4>${exp.jobTitle}</h4>
          <p>${exp.companyName}</p>
          <p>${exp.description}</p>
        </div>
      </div>
      <div class="date2">
        <p>${formatDate(exp.startDate)} - ${
      exp.currentlyWorking ? "الحالي" : formatDate(exp.endDate)
    }</p>
      </div>
    `;
    container.appendChild(experienceElement);

    const listElement = document.createElement("div");
    listElement.className = "second_con";
    listElement.innerHTML = `
      <div class="veiw_con">
        <img src="./mentor-images/briefcase.svg" alt="أيقونة عمل">
        <div class="text">
          <h4>${exp.jobTitle}</h4>
          <p>${exp.companyName}</p>
        </div>
      </div>
      <div class="date2_con">
        <div class="date2">
          <p>${formatDate(exp.startDate)} - ${
      exp.currentlyWorking ? "الحالي" : formatDate(exp.endDate)
    }</p>
        </div>
        <img src="./mentor-images/edit-2.svg" alt="تعديل" class="edit-exp" data-id="${
          exp.id
        }">
        <img src="./mentor-images/trash.svg" alt="حذف" class="delete-exp" data-id="${
          exp.id
        }">
      </div>
    `;
    listContainer.appendChild(listElement);
  });
}

function populateCertificates(certificates) {
  const container = document.getElementById("certificatesContainer");
  const listContainer = document.getElementById("certificateList");
  container.innerHTML = "";
  listContainer.innerHTML = "";

  const initialCertificates = certificates.slice(0, 3);
  const remainingCertificates = certificates.slice(3);

  initialCertificates.forEach((cert) => {
    container.appendChild(createCertificateElement(cert));
  });

  const hiddenContainer = document.createElement("div");
  hiddenContainer.id = "hiddenCertificates";
  hiddenContainer.style.display = "none";
  remainingCertificates.forEach((cert) => {
    hiddenContainer.appendChild(createCertificateElement(cert));
  });
  container.appendChild(hiddenContainer);

  certificates.forEach((cert) => {
    const listElement = document.createElement("div");
    listElement.className = "second_con";
    listElement.innerHTML = `
      <div class="veiw_con">
        <img src="${cert.image_url}" width="100px" alt="صورة الشهادة">
        <div class="text">
          <h4>${cert.name}</h4>
          <p>${cert.issuingAuthority}</p>
          <p>${formatDate(cert.issueDate)}</p>
        </div>
      </div>
      <div class="education">
        <div class="edu_con">
          <p>عرض الشهادة</p>
          <img src="./mentor-images/export.svg" alt="عرض">
        </div>
        <img src="./mentor-images/edit-2.svg" alt="تعديل" class="edit-cert" data-id="${
          cert.id
        }">
        <img src="./mentor-images/trash.svg" alt="حذف" class="delete-cert" data-id="${
          cert.id
        }">
      </div>
    `;
    listContainer.appendChild(listElement);
  });

  const moreBtn = document.getElementById("moreBtnCert");
  const moreIcon = moreBtn.querySelector(".more-icon");
  const btnText = moreBtn.querySelector(".btn-text");
  if (certificates.length > 3) {
    moreBtn.style.display = "block";
    btnText.textContent = `عرض المزيد +${remainingCertificates.length}`;
    let isExpanded = false;
    moreBtn.onclick = () => {
      isExpanded = !isExpanded;
      hiddenContainer.style.display = isExpanded ? "block" : "none";
      btnText.textContent = isExpanded
        ? "عرض أقل"
        : `عرض المزيد +${remainingCertificates.length}`;
      moreIcon.style.transform = isExpanded ? "rotate(180deg)" : "rotate(0deg)";
    };
  } else {
    moreBtn.style.display = "none";
  }
}

function createCertificateElement(cert) {
  const certElement = document.createElement("div");
  certElement.className = "second_con";
  certElement.innerHTML = `
    <div class="veiw_con">
      <img src="${cert.image_url}" width="100px" alt="صورة الشهادة">
      <div class="text">
        <h4>${cert.name}</h4>
        <p>${cert.issuingAuthority}</p>
        <p>${formatDate(cert.issueDate)}</p>
      </div>
    </div>
    <div class="education">
      <div class="edu_con">
        <a href="${cert.certificateLink}" target="_blank">عرض الشهادة</a>
        <img src="./mentor-images/export.svg" alt="عرض">
      </div>
    </div>
  `;
  return certElement;
}

function populateEducation(education) {
  const container = document.getElementById("educationContainer");
  const listContainer = document.getElementById("educationList");
  container.innerHTML = "";
  listContainer.innerHTML = "";

  education.forEach((edu) => {
    const eduElement = document.createElement("div");
    eduElement.className = "second_con";
    eduElement.innerHTML = `
      <div class="veiw_con">
        <img src="./mentor-images/education.svg" alt="أيقونة تعليم">
        <div class="text">
          <h4>${edu.degree}</h4>
          <p>${edu.institution}</p>
        </div>
      </div>
      <div class="date2">
        <p>${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</p>
      </div>
    `;
    container.appendChild(eduElement);

    const listElement = document.createElement("div");
    listElement.className = "second_con";
    listElement.innerHTML = `
      <div class="veiw_con">
        <img src="./mentor-images/education.svg" alt="أيقونة تعليم">
        <div class="text">
          <h4>${edu.degree}</h4>
          <p>${edu.institution}</p>
        </div>
      </div>
      <div class="date2_con">
        <div class="date2">
          <p>${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</p>
        </div>
        <img src="./mentor-images/edit-2.svg" alt="تعديل" class="edit-edu" data-id="${
          edu.id
        }">
        <img src="./mentor-images/trash.svg" alt="حذف" class="delete-edu" data-id="${
          edu.id
        }">
      </div>
    `;
    listContainer.appendChild(listElement);
  });
}

// Notification Functions
function renderNotifications() {
  const notificationsContainer = document.querySelector(
    ".notifications-container"
  );
  if (!notificationsContainer) return;
  notificationsContainer.innerHTML = "";

  notificationsData.forEach((notification, index) => {
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
      notificationsData.splice(index, 1);
      renderNotifications();
      updateNotificationCount();
    });

    const actionButtons = notificationEl.querySelectorAll(".action-button");
    actionButtons.forEach((btn, btnIndex) => {
      btn.addEventListener("click", () => {
        console.log(`Action clicked: ${notification.actions[btnIndex].label}`);
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
    notificationCountEl.textContent = notificationsData.length;
    notificationCountEl.style.display =
      notificationsData.length > 0 ? "block" : "none";
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

// Form Submissions
function setupFormSubmissions() {
  document
    .getElementById("professionalForm")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      if (validateForm("professionalForm")) {
        dummyMentorData.data.name =
          document.getElementById("mentor_name").value;
        dummyMentorData.data.gender = document.getElementById("gender").value;
        dummyMentorData.data.country = document.getElementById("country").value;
        dummyMentorData.data.bio = document.getElementById("about_me").value;
        alert("تم تحديث المعلومات الأساسية بنجاح (بيانات تجريبية)");
        closeModal("editProfileInfo");
        populatePageWithMentorData(dummyMentorData.data);
      }
    });

  document.getElementById("socialForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm("socialForm")) {
      dummyMentorData.data.linkedin = document.getElementById("linkedin").value;
      dummyMentorData.data.behance = document.getElementById("behance").value;
      dummyMentorData.data.github = document.getElementById("github").value;
      dummyMentorData.data.instagram =
        document.getElementById("instagram").value;
      alert("تم تحديث الروابط الاجتماعية بنجاح (بيانات تجريبية)");
      closeModal("editProfileInfo");
      updateSocialLinks(dummyMentorData.data);
    }
  });

  document.getElementById("experienceForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm("experienceForm")) {
      const form = document.getElementById("experienceForm");
      const expId = form.dataset.editId;
      const newExp = {
        id: expId
          ? parseInt(expId)
          : dummyMentorData.data.experiences.length + 1,
        jobTitle: document.getElementById("jobTitle").value,
        companyName: document.getElementById("companyName").value,
        startDate: document.getElementById("expStartDate").value,
        endDate: document.getElementById("currentlyWorking").checked
          ? null
          : document.getElementById("expEndDate").value,
        currentlyWorking: document.getElementById("currentlyWorking").checked,
        description: document.getElementById("expDescription").value,
      };
      if (expId) {
        const index = dummyMentorData.data.experiences.findIndex(
          (e) => e.id == expId
        );
        dummyMentorData.data.experiences[index] = newExp;
      } else {
        dummyMentorData.data.experiences.push(newExp);
      }
      alert(`تم ${expId ? "تحديث" : "إضافة"} الخبرة بنجاح (بيانات تجريبية)`);
      closeModal("editProfileEx_edit2");
      populateDynamicSections(dummyMentorData.data);
    }
  });

  document.getElementById("certificateForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm("certificateForm")) {
      const form = document.getElementById("certificateForm");
      const certId = form.dataset.editId;
      const newCert = {
        id: certId
          ? parseInt(certId)
          : dummyMentorData.data.certificates.length + 1,
        name: document.getElementById("certificateName").value,
        issuingAuthority: document.getElementById("issuingAuthority").value,
        issueDate: document.getElementById("certStartDate").value,
        certificateNumber: document.getElementById("certificateNumber").value,
        certificateLink: document.getElementById("certificateLink").value,
        image_url:
          document.getElementById("certificateImage")?.value ||
          "https://i.pinimg.com/736x/18/c6/e0/18c6e05ccc51b8e8e8385d0b38105d83.jpg",
      };
      if (certId) {
        const index = dummyMentorData.data.certificates.findIndex(
          (c) => c.id == certId
        );
        dummyMentorData.data.certificates[index] = newCert;
      } else {
        dummyMentorData.data.certificates.push(newCert);
      }
      alert(`تم ${certId ? "تحديث" : "إضافة"} الشهادة بنجاح (بيانات تجريبية)`);
      closeModal("editProfileSp_add");
      populateDynamicSections(dummyMentorData.data);
    }
  });

  document.getElementById("educationForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm("educationForm")) {
      const form = document.getElementById("educationForm");
      const eduId = form.dataset.editId;
      const newEdu = {
        id: eduId ? parseInt(eduId) : dummyMentorData.data.education.length + 1,
        institution: document.getElementById("institution").value,
        degree: document.getElementById("degree").value,
        startDate: document.getElementById("eduStartDate").value,
        endDate: document.getElementById("eduEndDate").value,
      };
      if (eduId) {
        const index = dummyMentorData.data.education.findIndex(
          (e) => e.id == eduId
        );
        dummyMentorData.data.education[index] = newEdu;
      } else {
        dummyMentorData.data.education.push(newEdu);
      }
      alert(`تم ${eduId ? "تحديث" : "إضافة"} التعليم بنجاح (بيانات تجريبية)`);
      closeModal("editProfileEdu_add");
      populateDynamicSections(dummyMentorData.data);
    }
  });
}

// File Uploads
function setupFileUploads() {
  const uploadImage = document.getElementById("uploadImage");
  const uploadImageBackground = document.getElementById(
    "uploadImageBackground"
  );
  const videoInput = document.getElementById("videoInput");
  const removeProfileImage = document.getElementById("removeProfileImage");

  if (uploadImage) {
    uploadImage.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file && file.size <= 2 * 1024 * 1024) {
        dummyMentorData.data.image_url = URL.createObjectURL(file);
        document.getElementById("image1").src = dummyMentorData.data.image_url;
        document.getElementById("image2").src = dummyMentorData.data.image_url;
        document.getElementById("profileImagePreview").src =
          dummyMentorData.data.image_url;
        alert("تم تحديث صورة الملف الشخصي بنجاح (بيانات تجريبية)");
      } else {
        alert("حجم الملف يجب أن يكون أقل من 2 ميجابايت");
      }
    });
  }

  if (uploadImageBackground) {
    uploadImageBackground.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        dummyMentorData.data.background_image_url = URL.createObjectURL(file);
        document.getElementById("background_image").src =
          dummyMentorData.data.background_image_url;
        alert("تم تحديث صورة الخلفية بنجاح (بيانات تجريبية)");
      }
    });
  }

  if (videoInput) {
    videoInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file && file.type.includes("mp4") && file.size <= 25 * 1024 * 1024) {
        dummyMentorData.data.video_url = URL.createObjectURL(file);
        const videoPlayer = document.getElementById("videoPlayer");
        videoPlayer.src = dummyMentorData.data.video_url;
        videoPlayer.style.display = "block";
        document.getElementById("uplodimage").style.display = "none";
        document.getElementById("uplodeBtn").style.display = "none";
        document.getElementById("size").style.display = "none";
        alert("تم تحديث الفيديو التعريفي بنجاح (بيانات تجريبية)");
      } else {
        alert("يجب أن يكون الفيديو بصيغة MP4 وحجمه أقل من 25 ميجابايت");
      }
    });
  }

  if (removeProfileImage) {
    removeProfileImage.addEventListener("click", () => {
      if (confirm("هل أنت متأكد من حذف صورة الملف الشخصي؟")) {
        dummyMentorData.data.image_url = "./ahmedphoto.webp";
        document.getElementById("image1").src = dummyMentorData.data.image_url;
        document.getElementById("image2").src = dummyMentorData.data.image_url;
        document.getElementById("profileImagePreview").src =
          dummyMentorData.data.image_url;
        alert("تم حذف صورة الملف الشخصي بنجاح (بيانات تجريبية)");
      }
    });
  }
}

// Date Pickers
function initDatePickers() {
  const datePairs = [
    { start: "expStartDate", end: "expEndDate" },
    { start: "certStartDate", end: "certEndDate" },
    { start: "eduStartDate", end: "eduEndDate" },
  ];

  datePairs.forEach(({ start, end }) => {
    const startPicker = flatpickr(`#${start}`, {
      locale: "ar",
      dateFormat: "Y-m-d",
      allowInput: true,
      onChange: (selectedDates) => {
        if (selectedDates[0]) {
          endPicker.set("minDate", selectedDates[0]);
        }
      },
    });

    const endPicker = flatpickr(`#${end}`, {
      locale: "ar",
      dateFormat: "Y-m-d",
      allowInput: true,
      onChange: (selectedDates) => {
        if (selectedDates[0]) {
          startPicker.set("maxDate", selectedDates[0]);
        }
      },
    });

    const currentlyWorking = document.getElementById("currentlyWorking");
    if (currentlyWorking) {
      currentlyWorking.addEventListener("change", (e) => {
        const endDateInput = document.getElementById("expEndDate");
        endDateInput.disabled = e.target.checked;
        if (e.target.checked) {
          endDateInput.value = "";
        }
      });
    }
  });
}

// Tab Switching for Main Page
function switchTab(tabName) {
  const tabs = {
    overview: { content: "overviewContent", tab: "overviewTab" },
    rating: { content: "ratingContent", tab: "ratingTab" },
    achievements: { content: "achievementsContent", tab: "achievementsTab" },
  };

  Object.values(tabs).forEach(({ content, tab }) => {
    const contentElement = document.getElementById(content);
    if (contentElement) {
      contentElement.style.display = "none";
    }
    const tabElement = document.getElementById(tab);
    if (tabElement) {
      tabElement.classList.remove("checked");
    }
  });

  const selectedContent = document.getElementById(tabs[tabName].content);
  const selectedTab = document.getElementById(tabs[tabName].tab);
  if (selectedContent) {
    selectedContent.style.display = "block";
  }
  if (selectedTab) {
    selectedTab.classList.add("checked");
  }

  if (tabName === "rating") {
    populateRatingTab(dummyMentorData.data);
  } else if (tabName === "achievements") {
    populateAchievementsTab(dummyMentorData.data);
  }
}

// Modal Tab Switching for Edit Profile Modal
function setupModalTabSwitching() {
  const tabs = [
    { tabId: "BasicInfoTab", content: ["professionalForm", "socialForm"] },
    { tabId: "ExperienceTab", content: ["experienceList"] },
    { tabId: "CertificatesTab", content: ["certificateList"] },
    { tabId: "EducationTab", content: ["educationList"] },
  ];

  tabs.forEach(({ tabId, content }) => {
    const tab = document.getElementById(tabId);
    if (tab) {
      tab.addEventListener("click", () => {
        document
          .querySelectorAll(".infolist p")
          .forEach((t) => t.classList.remove("checked"));
        tab.classList.add("checked");

        document
          .querySelectorAll(
            ".form_contaner, #experienceList, #certificateList, #educationList"
          )
          .forEach((el) => {
            el.style.display = "none";
          });

        content.forEach((id) => {
          const element = document.getElementById(id);
          if (element) element.style.display = "block";
        });

        const addButtons = {
          ExperienceTab: "moreExBtn_EX",
          CertificatesTab: "moreExBtn_SP",
          EducationTab: "moreExBtn_Edu",
        };
        Object.values(addButtons).forEach((btnId) => {
          const btn = document.getElementById(btnId);
          if (btn) btn.style.display = "none";
        });
        if (addButtons[tabId]) {
          const btn = document.getElementById(addButtons[tabId]);
          if (btn) btn.style.display = "block";
        }
      });
    }
  });

  const basicInfoTab = document.getElementById("BasicInfoTab");
  if (basicInfoTab) {
    basicInfoTab.classList.add("checked");
  }
  const professionalForm = document.getElementById("professionalForm");
  const socialForm = document.getElementById("socialForm");
  if (professionalForm) professionalForm.style.display = "block";
  if (socialForm) socialForm.style.display = "block";
}

// Handle Modal Interactions
function setupModalEventListeners() {
  const openModalConfigs = [
    { btnId: "editBtn", modalId: "editProfileInfo" },
    { btnId: "editBtnMain", modalId: "editProfileInfo" },
    { btnId: "edit_2BtnExp", modalId: "editProfileEx_edit" },
    { btnId: "edit_addExp", modalId: "editProfileEx_edit2" },
    { btnId: "moreExBtn_EX", modalId: "editProfileEx_edit2" },
    { btnId: "edit_2BtnCert", modalId: "editProfileSp_edit" },
    { btnId: "edit_addCert", modalId: "editProfileSp_add" },
    { btnId: "moreExBtn_SP", modalId: "editProfileSp_add" },
    { btnId: "edit_2BtnEdu", modalId: "editProfileEdu_edit" },
    { btnId: "edit_addEdu", modalId: "editProfileEdu_add" },
    { btnId: "moreExBtn_Edu", modalId: "editProfileEdu_add" },
    {
      btnId: "edit_bigimage",
      modalId: null,
      action: () => document.getElementById("uploadImageBackground").click(),
    },
  ];

  const closeModalConfigs = [
    { btnId: "closeBtn1", modalId: "editProfileInfo" },
    { btnId: "closeBtn3", modalId: "editProfileEx_edit" },
    { btnId: "closeBtn4", modalId: "editProfileEx_edit2" },
    { btnId: "closeBtn5", modalId: "editProfileSp_add" },
    { btnId: "closeBtn6", modalId: "editProfileEdu_add" },
    { btnId: "closeBtn7", modalId: "editProfileEdu_edit" },
    { btnId: "closeBtn9", modalId: "editProfileSp_edit" },
  ];

  openModalConfigs.forEach((config) => {
    const button = document.getElementById(config.btnId);
    if (button) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        if (config.modalId) {
          openModal(config.modalId);
        } else if (config.action) {
          config.action();
        }
      });
    }
  });

  closeModalConfigs.forEach((config) => {
    const button = document.getElementById(config.btnId);
    if (button) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal(config.modalId);
      });
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-exp")) {
      e.preventDefault();
      const expId = e.target.dataset.id;
      const exp = dummyMentorData.data.experiences.find((e) => e.id == expId);
      if (exp) {
        const form = document.getElementById("experienceForm");
        form.dataset.editId = expId;
        document.getElementById("jobTitle").value = exp.jobTitle;
        document.getElementById("companyName").value = exp.companyName;
        document.getElementById("expStartDate").value = exp.startDate;
        document.getElementById("expEndDate").value = exp.endDate || "";
        document.getElementById("currentlyWorking").checked =
          exp.currentlyWorking;
        document.getElementById("expDescription").value = exp.description;
        openModal("editProfileEx_edit2");
      }
    } else if (e.target.classList.contains("delete-exp")) {
      e.preventDefault();
      if (confirm("هل أنت متأكد من حذف هذه الخبرة؟")) {
        const expId = e.target.dataset.id;
        dummyMentorData.data.experiences =
          dummyMentorData.data.experiences.filter((e) => e.id != expId);
        populateDynamicSections(dummyMentorData.data);
      }
    } else if (e.target.classList.contains("edit-cert")) {
      e.preventDefault();
      const certId = e.target.dataset.id;
      const cert = dummyMentorData.data.certificates.find(
        (c) => c.id == certId
      );
      if (cert) {
        const form = document.getElementById("certificateForm");
        form.dataset.editId = certId;
        document.getElementById("certificateName").value = cert.name;
        document.getElementById("issuingAuthority").value =
          cert.issuingAuthority;
        document.getElementById("certStartDate").value = cert.issueDate;
        document.getElementById("certificateNumber").value =
          cert.certificateNumber;
        document.getElementById("certificateLink").value = cert.certificateLink;
        document.getElementById("certificateImage").value = cert.image_url;
        openModal("editProfileSp_add");
      }
    } else if (e.target.classList.contains("delete-cert")) {
      e.preventDefault();
      if (confirm("هل أنت متأكد من حذف هذه الشهادة؟")) {
        const certId = e.target.dataset.id;
        dummyMentorData.data.certificates =
          dummyMentorData.data.certificates.filter((c) => c.id != certId);
        populateDynamicSections(dummyMentorData.data);
      }
    } else if (e.target.classList.contains("edit-edu")) {
      e.preventDefault();
      const eduId = e.target.dataset.id;
      const edu = dummyMentorData.data.education.find((e) => e.id == eduId);
      if (edu) {
        const form = document.getElementById("educationForm");
        form.dataset.editId = eduId;
        document.getElementById("institution").value = edu.institution;
        document.getElementById("degree").value = edu.degree;
        document.getElementById("eduStartDate").value = edu.startDate;
        document.getElementById("eduEndDate").value = edu.endDate;
        openModal("editProfileEdu_add");
      }
    } else if (e.target.classList.contains("delete-edu")) {
      e.preventDefault();
      if (confirm("هل أنت متأكد من حذف هذا التعليم؟")) {
        const eduId = e.target.dataset.id;
        dummyMentorData.data.education = dummyMentorData.data.education.filter(
          (e) => e.id != eduId
        );
        populateDynamicSections(dummyMentorData.data);
      }
    } else if (e.target.classList.contains("removeBtn")) {
      e.preventDefault();
      const form = e.target.closest("form");
      if (form) {
        const modal = form.closest(".overlay");
        if (modal) closeModal(modal.id);
      }
    }
  });

  document.querySelectorAll(".overlay").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const openModals = document.querySelectorAll('.overlay[style*="block"]');
      openModals.forEach((modal) => closeModal(modal.id));
    }
  });

  document
    .getElementById("overviewTab")
    ?.addEventListener("click", () => switchTab("overview"));
  document
    .getElementById("ratingTab")
    ?.addEventListener("click", () => switchTab("rating"));
  document
    .getElementById("achievementsTab")
    ?.addEventListener("click", () => switchTab("achievements"));
}

// Initialize Page
function initMentorPage() {
  initializeAuth();
  renderNotifications();

  const overviewContent = document.getElementById("overviewContent");
  const overviewTab = document.getElementById("overviewTab");
  if (overviewContent) overviewContent.style.display = "block";
  if (overviewTab) overviewTab.classList.add("checked");

  const ratingContent = document.getElementById("ratingContent");
  const achievementsContent = document.getElementById("achievementsContent");
  if (ratingContent) ratingContent.style.display = "none";
  if (achievementsContent) achievementsContent.style.display = "none";

  populatePageWithMentorData(dummyMentorData.data);
  setupFormSubmissions();
  setupFileUploads();
  initDatePickers();
  setupModalEventListeners();
  setupModalTabSwitching();

  document.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", () => checkInputDirection(input));
    checkInputDirection(input);
  });
}

document.addEventListener("DOMContentLoaded", initMentorPage);
