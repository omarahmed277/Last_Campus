document.addEventListener("DOMContentLoaded", async function () {
  // Cache for storing fetched data to reduce API calls
  const dataCache = {
    experiences: null,
    certifications: null,
    education: null,
    ratings: null,
    achievements: null,
  };

  // Utility Functions
  // Sanitize user input to prevent XSS
  function sanitizeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str || "";
    return div.innerHTML;
  }

  // Adjust input direction (RTL/LTR) based on Arabic or Latin text
  function checkInputDirection(input) {
    const value = input.value || "";
    input.style.direction = /[\u0600-\u06FF]/.test(value) ? "rtl" : "ltr";
    input.style.textAlign = /[\u0600-\u06FF]/.test(value) ? "right" : "left";
  }

  // Format date to Arabic locale or show "current" for ongoing
  function formatDate(dateString) {
    if (!dateString) return "الحالي";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // Initialize notifications
  let notificationsData = [];
  try {
    notificationsData = await window.auth.fetchNotifications();
    console.log("Notifications loaded:", notificationsData);
  } catch (error) {
    console.error("Failed to fetch notifications:", error.message);
  }

  // Initialize authentication UI and functionality
  const authSection = document.querySelector(".left_Sec");
  if (authSection) {
    common.initializeAuth(
      authSection,
      notificationsData,
      common.showLoginPopup,
      common.showSignupPopup,
      common.toggleNotifications,
      () => common.updateNotificationCount(notificationsData)
    );
    common.renderNotifications(notificationsData, () =>
      common.updateNotificationCount(notificationsData)
    );
  }

  // Initialize Flatpickr for date inputs with Arabic locale
  function initializeFlatpickr() {
    const dateInputs = document.querySelectorAll(".date-start, .date-end");
    dateInputs.forEach((input) => {
      flatpickr(input, {
        locale: "ar",
        dateFormat: "Y-m-d",
        allowInput: true,
        altInput: true,
        altFormat: "d/m/Y",
        onChange: function (selectedDates, dateStr) {
          const pairId = input.dataset.pair;
          if (pairId && input.classList.contains("date-start")) {
            const pairInput = document.getElementById(pairId);
            if (pairInput) pairInput._flatpickr.set("minDate", dateStr);
          }
        },
      });
    });
  }

  // Fetch and display user profile data
  async function loadUserProfile() {
    const profileContainer = document.querySelector("#profile-hero");
    if (!profileContainer) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      common.showLoginPopup();
      return;
    }

    try {
      const userData = await common.fetchUserData(token);
      const image1 = profileContainer.querySelector("#image1");
      const image2 = profileContainer.querySelector("#image2");
      const profileImagePreview = document.getElementById(
        "profileImagePreview"
      );
      const mentorName = profileContainer.querySelector(".mentor_name");
      const mentorJob = profileContainer.querySelector("#mentor_jop");
      const mentorBio = document.querySelector("#mentorBio");
      const linkedinLink = profileContainer.querySelector("#linkedinLink");
      const behanceLink = profileContainer.querySelector("#behanceLink");
      const githubLink = profileContainer.querySelector("#githubLink");
      const instagramLink = profileContainer.querySelector("#instagramLink");
      const totalMinutes = document.getElementById("totalMinutes");
      const totalSessions = document.getElementById("totalSessions");
      const backgroundImage = document.getElementById("background_image");

      if (image1)
        image1.src =
          userData.image_url || "../mentor-images/NoProfilePhoto.svg";
      if (image2)
        image2.src =
          userData.image_url || "../mentor-images/NoProfilePhoto.svg";
      if (profileImagePreview)
        profileImagePreview.src =
          userData.image_url || "../mentor-images/NoProfilePhoto.svg";
      if (mentorName) mentorName.textContent = userData.name || "المرشد الأول";
      if (mentorJob)
        mentorJob.textContent = userData.specialization || "غير محدد";
      if (mentorBio) mentorBio.textContent = userData.bio || "لا توجد نبذة";
      if (linkedinLink) linkedinLink.href = userData.linkedin || "#";
      if (behanceLink) behanceLink.href = userData.behance || "#";
      if (githubLink) githubLink.href = userData.github || "#";
      if (instagramLink) instagramLink.href = userData.instagram || "#";
      if (totalMinutes)
        totalMinutes.textContent = `${userData.totalMinutes || 0} دقيقة`;
      if (totalSessions)
        totalSessions.textContent = userData.totalSessions || 0;
      if (backgroundImage)
        backgroundImage.src =
          userData.background_image_url ||
          "../mentor-images/dummyBackground.png";

      // Populate edit forms with user data
      document.getElementById("mentor_name").value = userData.name || "";
      document.getElementById("about_me").value = userData.bio || "";
      document.getElementById("gender").value = userData.gender || "";
      document.getElementById("country").value = userData.country || "";
      document.getElementById("linkedin").value = userData.linkedin || "";
      document.getElementById("behance").value = userData.behance || "";
      document.getElementById("github").value = userData.github || "";
      document.getElementById("instagram").value = userData.instagram || "";
    } catch (error) {
      console.error("Failed to load user profile:", error.message);
    }
  }

  // Fetch and render section data (experiences, certifications, etc.)
  async function loadSectionData(section, containerId, renderFn, listId) {
    const container = document.querySelector(containerId);
    const listContainer = document.querySelector(listId);
    if (!container || !listContainer) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const decodedToken = common.decodeJWT(token);
      const userId = decodedToken?.sub || decodedToken?.id;
      if (!userId) throw new Error("Invalid token: User ID not found");

      // Use cached data if available
      if (dataCache[section] !== null) {
        const items = dataCache[section];
        container.innerHTML = "";
        listContainer.innerHTML = "";
        if (items.length === 0) {
          container.innerHTML = `<p class="no-data">لا توجد نتائج لعرضها</p>`;
          listContainer.innerHTML = `<p class="no-data">لا توجد نتائج لعرضها</p>`;
          return;
        }
        items.forEach((item, index) => {
          renderFn(container, item, false);
          renderFn(listContainer, item, true);
          if (
            section === "certifications" &&
            index >= 3 &&
            containerId === "#certificatesContainer"
          ) {
            const hiddenContainer =
              document.getElementById("hiddenCertificates") ||
              document.createElement("div");
            hiddenContainer.id = "hiddenCertificates";
            hiddenContainer.style.display = "none";
            container.appendChild(hiddenContainer);
            hiddenContainer.appendChild(container.lastChild);
          }
        });
        return;
      }

      // Construct API endpoint based on section
      const endpoint =
        section === "education"
          ? `/education/${userId}`
          : `/${section}/${userId}`;
      const response = await fetch(
        `https://tawgeeh-v1-production.up.railway.app${endpoint}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await window.auth.handleApiError(response);
      const data = await response.json();
      const items = data[section] || data || [];

      // Cache the fetched data
      dataCache[section] = items;

      container.innerHTML = "";
      listContainer.innerHTML = "";
      if (items.length === 0) {
        container.innerHTML = `<p class="no-data">لا توجد نتائج لعرضها</p>`;
        listContainer.innerHTML = `<p class="no-data">لا توجد نتائج لعرضها</p>`;
        return;
      }

      items.forEach((item, index) => {
        renderFn(container, item, false);
        renderFn(listContainer, item, true);
        if (
          section === "certifications" &&
          index >= 3 &&
          containerId === "#certificatesContainer"
        ) {
          const hiddenContainer =
            document.getElementById("hiddenCertificates") ||
            document.createElement("div");
          hiddenContainer.id = "hiddenCertificates";
          hiddenContainer.style.display = "none";
          container.appendChild(hiddenContainer);
          hiddenContainer.appendChild(container.lastChild);
        }
      });

      // Handle "Show More" button for certifications
      if (section === "certifications") {
        const moreBtn = document.getElementById("moreBtnCert");
        if (moreBtn && items.length > 3) {
          moreBtn.style.display = "block";
          const btnText = moreBtn.querySelector(".btn-text");
          btnText.textContent = `عرض المزيد +${items.length - 3}`;
          let isExpanded = false;
          moreBtn.onclick = () => {
            isExpanded = !isExpanded;
            const hiddenContainer =
              document.getElementById("hiddenCertificates");
            hiddenContainer.style.display = isExpanded ? "block" : "none";
            btnText.textContent = isExpanded
              ? "عرض أقل"
              : `عرض المزيد +${items.length - 3}`;
            moreBtn.querySelector(".more-icon").style.transform = isExpanded
              ? "rotate(180deg)"
              : "rotate(0deg)";
          };
        } else if (moreBtn) {
          moreBtn.style.display = "none";
        }
      }
    } catch (error) {
      console.error(`Failed to load ${section}:`, error.message);
      container.innerHTML = `<p class="no-data">لا توجد نتائج لعرضها</p>`;
      listContainer.innerHTML = `<p class="no-data">لا توجد نتائج لعرضها</p>`;
    }
  }

  // Render functions for different sections
  function renderExperience(container, item, isList) {
    const div = document.createElement("div");
    div.className = "second_con";
    div.innerHTML = `
      <div class="veiw_con">
        <img src="../mentor-images/briefcase.svg" alt="أيقونة عمل">
        <div class="text">
          <h4>${sanitizeHTML(item.jobTitle || item.title || "غير محدد")}</h4>
          <p>${sanitizeHTML(item.companyName || item.company || "غير محدد")}</p>
          ${
            isList
              ? ""
              : `<p>${sanitizeHTML(item.description || "لا يوجد وصف")}</p>`
          }
        </div>
      </div>
      <div class="${isList ? "date2_con" : "date2"}">
        <p>${formatDate(item.startDate)} - ${
      item.endDate ? formatDate(item.endDate) : "الحالي"
    }</p>
        ${
          isList
            ? `
              <img src="../mentor-images/edit-2.svg" alt="تعديل" class="edit-exp" data-id="${item.id}">
              <img src="../mentor-images/trash.svg" alt="حذف" class="delete-exp" data-id="${item.id}">
            `
            : ""
        }
      </div>
    `;
    container.appendChild(div);
  }

  function renderCertificate(container, item, isList) {
    const div = document.createElement("div");
    div.className = "second_con";
    div.innerHTML = `
      <div class="veiw_con">
        <img src="${sanitizeHTML(
          item.image_url || "../mentor-images/default-cert.jpg"
        )}" width="100px" alt="صورة الشهادة">
        <div class="text">
          <h4>${sanitizeHTML(item.name || "غير محدد")}</h4>
          <p>${sanitizeHTML(
            item.issuingAuthority || item.issuer || "غير محدد"
          )}</p>
          <p>${formatDate(item.issueDate)}</p>
        </div>
      </div>
      <div class="education">
        <div class="edu_con">
          ${
            item.certificateLink || item.url
              ? `<a href="${sanitizeHTML(
                  item.certificateLink || item.url
                )}" target="_blank">عرض الشهادة</a>`
              : "<p>عرض الشهادة</p>"
          }
          <img src="../mentor-images/export.svg" alt="عرض">
        </div>
        ${
          isList
            ? `
              <img src="../mentor-images/edit-2.svg" alt="تعديل" class="edit-cert" data-id="${item.id}">
              <img src="../mentor-images/trash.svg" alt="حذف" class="delete-cert" data-id="${item.id}">
            `
            : ""
        }
      </div>
    `;
    container.appendChild(div);
  }

  function renderEducation(container, item, isList) {
    const div = document.createElement("div");
    div.className = "second_con";
    div.innerHTML = `
      <div class="veiw_con">
        <img src="../mentor-images/education.svg" alt="أيقونة تعليم">
        <div class="text">
          <h4>${sanitizeHTML(item.degree || "غير محدد")}</h4>
          <p>${sanitizeHTML(item.institution || "غير محدد")}</p>
        </div>
      </div>
      <div class="${isList ? "date2_con" : "date2"}">
        <p>${formatDate(item.startDate)} - ${formatDate(item.endDate)}</p>
        ${
          isList
            ? `
              <img src="../mentor-images/edit-2.svg" alt="تعديل" class="edit-edu" data-id="${item.id}">
              <img src="../mentor-images/trash.svg" alt="حذف" class="delete-edu" data-id="${item.id}">
            `
            : ""
        }
      </div>
    `;
    container.appendChild(div);
  }

  function renderRating(container, item, isList) {
    const div = document.createElement("div");
    div.className = "session1 sessionsFormat";
    const starsHtml = generateStars(item.rating);
    const formattedDate = new Date(
      item.createdAt || item.date
    ).toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    div.innerHTML = `
      <div class="session_con">
        <img class="menteePhoto" src="${sanitizeHTML(
          item.menteeImage || "../mentor-images/default-user.jpg"
        )}" alt="مجهول" />
        <div class="time timeR">
          <h4>${sanitizeHTML(
            item.reviewerName || item.menteeName || "مجهول"
          )}</h4>
          <p>${sanitizeHTML(item.comment || "لا يوجد تعليق")}</p>
          <div class="stars_con">
            <p>${item.rating.toFixed(1)}</p>
            <div class="stars">${starsHtml}</div>
          </div>
        </div>
        <div class="rette-con">
          <div class="ratte">
            <span><p>${(Math.random() * 10).toFixed(
              1
            )}</p><img src="../mentor-images/hand-thumb-up.svg" alt="Likes" /></span>
            <span><p>رد</p><img src="../mentor-images/chat-bubble-oval-left-ellipsis.svg" alt="Reply" /></span>
          </div>
          <div class="date dateR"><p>${formattedDate}</p></div>
        </div>
      </div>
      ${
        isList
          ? `
            <div class="edit-actions">
              <button class="edit-btn" data-id="${item.id}">تعديل</button>
              <button class="delete-btn" data-id="${item.id}">حذف</button>
              <button class="like-btn" data-id="${item.id}">${
              item.liked ? "إلغاء الإعجاب" : "إعجاب"
            }</button>
            </div>
          `
          : ""
      }
    `;
    container.appendChild(div);
  }

  function generateStars(rating) {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - filledStars - halfStar;
    return `
      ${'<img src="../mentor-images/ic_baseline-star.svg" alt="Filled Star" />'.repeat(
        filledStars
      )}
      ${
        halfStar
          ? '<img src="../mentor-images/IcBaselineStarHalf.svg" alt="Half Star" />'
          : ""
      }
      ${'<img src="../mentor-images/ic_baseline-star (1).svg" alt="Empty Star" />'.repeat(
        emptyStars
      )}
    `;
  }

  function renderAchievement(container, item, isList) {
    const div = document.createElement("div");
    div.className = "session1 sessionsFormat";
    const progress = item.unlocked ? 100 : item.progress || 0;
    div.innerHTML = `
      <div class="session_con">
        <img class="AchievementPhoto" src="${sanitizeHTML(
          item.icon || "../mentor-images/default-achievement.svg"
        )}" alt="إنجاز" />
        <div class="time">
          <h4>${sanitizeHTML(item.title || "بدون عنوان")}</h4>
          <p>${sanitizeHTML(item.description || "بدون وصف")}</p>
        </div>
      </div>
      ${
        item.unlocked
          ? `<div class="date"><p>${formatDate(
              item.achievedAt || item.date
            )}</p></div>`
          : `<div class="progress"><progress value="${progress}" max="100"></progress><span>${progress}%</span></div>`
      }
      ${
        isList
          ? `
            <div class="edit-actions">
              <button class="edit-btn" data-id="${item.id}">تعديل</button>
              <button class="delete-btn" data-id="${item.id}">حذف</button>
            </div>
          `
          : ""
      }
    `;
    container.appendChild(div);
  }

// Show popup with form pre-filled for editing
  function showPopup(popupId, screenId, data = {}) {
    const popupContainer = document.getElementById(popupId);
    const popupOverlay = popupContainer?.parentElement;
    if (!popupContainer || !popupOverlay) {
      console.error(`Popup container or overlay not found for ID: ${popupId}`);
      return;
    }

    // Close other open popups to prevent overlap
    document.querySelectorAll(".overlay.show").forEach((modal) => {
      if (modal !== popupOverlay) hidePopup(modal.querySelector(".popup-container")?.id);
    });

    // Apply smooth transition for popup display
    popupOverlay.classList.add("show");
    popupOverlay.style.display = "block";
    popupContainer.classList.add("show");
    popupContainer.style.display = "block";

    // Show the specified screen within the popup
    const screens = popupContainer.querySelectorAll(".popup-screen");
    if (screens.length === 0) {
      console.warn(`No popup screens found in container: ${popupId}`);
    }
    screens.forEach((screen) => {
      screen.style.display = screen.id === screenId ? "block" : "none";
    });

    // Populate and reset form for editing
    const form = popupContainer.querySelector("form");
    if (form) {
      form.reset();
      delete form.dataset.id;
      Object.entries(data).forEach(([key, value]) => {
        const input = form.querySelector(`#${key}`);
        if (input) {
          if (input.type === "checkbox") {
            input.checked = !!value;
          } else {
            input.value = value || "";
          }
        }
      });
      if (data.id) form.dataset.id = data.id;
      if (data.currentlyWorking !== undefined) {
        const currentlyWorking = form.querySelector("#currentlyWorking");
        if (currentlyWorking) currentlyWorking.checked = data.currentlyWorking;
      }
      form.querySelectorAll(".error").forEach((span) => (span.textContent = ""));
      form.querySelectorAll("input, textarea, select").forEach((input) => {
        checkInputDirection(input);
        // Add input direction listener (not once, to allow multiple edits)
        input.addEventListener("input", () => checkInputDirection(input));
      });
    }

    // Hide authentication-related popups (with fallback)
    const authPopups = [
      "hideSignupPopup",
      "hideLoginPopup",
      "hideMentorApplicationPopup",
      "hidePasswordResetPopup",
    ];
    authPopups.forEach((fn) => {
      if (typeof common[fn] === "function") {
        common[fn]();
      } else {
        console.warn(`Common function ${fn} is not defined`);
      }
    });

    initializeFlatpickr();
  }

  // Hide popup with smooth transition
  function hidePopup(popupId) {
    const popupContainer = document.getElementById(popupId);
    const popupOverlay = popupContainer?.parentElement;
    if (!popupContainer || !popupOverlay) {
      console.error(`Popup container or overlay not found for ID: ${popupId}`);
      return;
    }

    // Skip if already hidden
    if (!popupOverlay.classList.contains("show")) return;

    // Apply smooth transition for hiding
    popupContainer.classList.remove("show");
    popupOverlay.classList.remove("show");

    // Delay display none to allow transition (match CSS transition duration)
    setTimeout(() => {
      popupContainer.style.display = "none";
      popupOverlay.style.display = "none";
    }, 300);

    // Reset form and clean up
    const form = popupContainer.querySelector("form");
    if (form) {
      form.reset();
      delete form.dataset.id;
      form.querySelectorAll(".error").forEach((span) => (span.textContent = ""));
      form.querySelectorAll("input, textarea, select").forEach((input) => {
        // Remove all input event listeners to prevent memory leaks
        const clone = input.cloneNode(true);
        input.parentNode.replaceChild(clone, input);
      });
    }
  }

  // Close a modal (distinct from popup, no overlay assumed)
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
      console.error(`Modal with ID ${modalId} not found`);
      return;
    }

    // Hide immediately (no transition for modals)
    modal.style.display = "none";

    // Reset form and clear errors
    const form = modal.querySelector("form");
    if (form) {
      form.reset();
      delete form.dataset.id; // Use dataset.id for consistency
      form.querySelectorAll(".error").forEach((span) => (span.textContent = ""));
      form.querySelectorAll("input, textarea, select").forEach((input) => {
        // Remove all input event listeners
        const clone = input.cloneNode(true);
        input.parentNode.replaceChild(clone, input);
      });
    }
  }
  // Validate form inputs based on type
  function validateForm(form, type) {
    let isValid = true;
    form.querySelectorAll(".error").forEach((span) => (span.textContent = ""));

    if (type === "professional") {
      const mentorName = form.querySelector("#mentor_name")?.value.trim();
      const gender = form.querySelector("#gender")?.value;
      const country = form.querySelector("#country")?.value;
      const aboutMe = form.querySelector("#about_me")?.value.trim();

      if (!mentorName) {
        form.querySelector("#mentor_nameError").textContent =
          "يرجى إدخال الاسم الكامل";
        isValid = false;
      }
      if (!gender) {
        form.querySelector("#genderError").textContent = "يرجى اختيار الجنس";
        isValid = false;
      }
      if (!country) {
        form.querySelector("#countryError").textContent = "يرجى اختيار البلد";
        isValid = false;
      }
      if (aboutMe.length < 20) {
        form.querySelector("#about_meError").textContent =
          "النبذة يجب أن تكون 20 حرفًا على الأقل";
        isValid = false;
      }
    } else if (type === "social") {
      const linkedin = form.querySelector("#linkedin")?.value.trim();
      const behance = form.querySelector("#behance")?.value.trim();
      const github = form.querySelector("#github")?.value.trim();
      const instagram = form.querySelector("#instagram")?.value.trim();

      if (linkedin && !linkedin.match(/https?:\/\/(www\.)?linkedin\.com\/.+/)) {
        form.querySelector("#linkedinError").textContent =
          "يرجى إدخال رابط LinkedIn صالح";
        isValid = false;
      }
      if (
        behance &&
        !behance.match(/https?:\/\/(www\.)?(behance\.net|dribbble\.com)\/.+/)
      ) {
        form.querySelector("#behanceError").textContent =
          "يرجى إدخال رابط Behance/Dribbble صالح";
        isValid = false;
      }
      if (github && !github.match(/https?:\/\/(www\.)?github\.com\/.+/)) {
        form.querySelector("#githubError").textContent =
          "يرجى إدخال رابط GitHub صالح";
        isValid = false;
      }
      if (
        instagram &&
        !instagram.match(/https?:\/\/(www\.)?instagram\.com\/.+/)
      ) {
        form.querySelector("#instagramError").textContent =
          "يرجى إدخال رابط Instagram صالح";
        isValid = false;
      }
    } else if (type === "experience") {
      const title = form.querySelector("#title")?.value.trim();
      const company = form.querySelector("#companyName")?.value.trim();
      const startDate = form.querySelector("#expStartDate")?.value;
      const description = form.querySelector("#expDescription")?.value.trim();

      if (!title) {
        form.querySelector("#titleError").textContent =
          "يرجى إدخال المسمى الوظيفي";
        isValid = false;
      }
      if (!company) {
        form.querySelector("#companyNameError").textContent =
          "يرجى إدخال اسم الشركة";
        isValid = false;
      }
      if (!startDate) {
        form.querySelector("#expStartDateError").textContent =
          "يرجى إدخال تاريخ البدء";
        isValid = false;
      }
      if (!description) {
        form.querySelector("#expDescriptionError").textContent =
          "يرجى إدخال الوصف";
        isValid = false;
      }
    } else if (type === "certificate") {
      const name = form.querySelector("#certificateName")?.value.trim();
      const issuer = form.querySelector("#issuingAuthority")?.value.trim();
      const issueDate = form.querySelector("#certStartDate")?.value;

      if (!name) {
        form.querySelector("#certificateNameError").textContent =
          "يرجى إدخال اسم الشهادة";
        isValid = false;
      }
      if (!issuer) {
        form.querySelector("#issuingAuthorityError").textContent =
          "يرجى إدخال الجهة المصدرة";
        isValid = false;
      }
      if (!issueDate) {
        form.querySelector("#certStartDateError").textContent =
          "يرجى إدخال تاريخ الإصدار";
        isValid = false;
      }
    } else if (type === "education") {
      const degree = form.querySelector("#degree")?.value.trim();
      const institution = form.querySelector("#institution")?.value.trim();
      const field = form.querySelector("#field")?.value.trim();
      const startDate = form.querySelector("#eduStartDate")?.value;

      if (!degree) {
        form.querySelector("#degreeError").textContent =
          "يرجى إدخال الدرجة العلمية";
        isValid = false;
      }
      if (!institution) {
        form.querySelector("#institutionError").textContent =
          "يرجى إدخال المؤسسة";
        isValid = false;
      }
      if (!field) {
        form.querySelector("#fieldError").textContent = "يرجى إدخال التخصص";
        isValid = false;
      }
      if (!startDate) {
        form.querySelector("#eduStartDateError").textContent =
          "يرجى إدخال تاريخ البدء";
        isValid = false;
      }
    } else if (type === "rating") {
      const reviewerName = form.querySelector("#reviewerName")?.value.trim();
      const comment = form.querySelector("#comment")?.value.trim();
      const rating = form.querySelector("#ratingScore")?.value;

      if (!reviewerName) {
        form.querySelector("#reviewerNameError").textContent =
          "يرجى إدخال اسم المراجع";
        isValid = false;
      }
      if (!comment) {
        form.querySelector("#commentError").textContent = "يرجى إدخال التعليق";
        isValid = false;
      }
      if (!rating || rating < 1 || rating > 5) {
        form.querySelector("#ratingScoreError").textContent =
          "يرجى إدخال تقييم بين 1 و5";
        isValid = false;
      }
    } else if (type === "achievement") {
      const title = form.querySelector("#achievementTitle")?.value.trim();
      const description = form
        .querySelector("#achievementDescription")
        ?.value.trim();
      const achievedAt = form.querySelector("#achievedAt")?.value;

      if (!title) {
        form.querySelector("#achievementTitleError").textContent =
          "يرجى إدخال عنوان الإنجاز";
        isValid = false;
      }
      if (!description) {
        form.querySelector("#achievementDescriptionError").textContent =
          "يرجى إدخال الوصف";
        isValid = false;
      }
      if (!achievedAt) {
        form.querySelector("#achievedAtError").textContent =
          "يرجى إدخال تاريخ الإنجاز";
        isValid = false;
      }
    }

    if (!isValid) {
      const firstError = form.querySelector(".error:not(:empty)");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        firstError.parentElement.querySelector("input,textarea")?.focus();
      }
    }

    return isValid;
  }

  // Initialize Profile Popup and Form Handlers
  function initializeProfilePopup() {
    // Setup popup elements
    const popup = document.getElementById("editProfileInfo");
    const closeBtn = document.getElementById("closeBtn1");
    const overlay = popup?.parentElement;

    // Handle close button click
    if (closeBtn)
      closeBtn.addEventListener("click", () => hidePopup("editProfileInfo"));
    // Handle overlay click to close
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) hidePopup("editProfileInfo");
      });
    }

    // Define tabs and their associated sections
    const tabs = {
      BasicInfoTab: ["professionalForm", "socialForm"],
      ExperienceTab: ["experienceList"],
      CertificatesTab: ["certificateList"],
      EducationTab: ["educationList"],
      RatingsTab: ["ratingList"],
      AchievementsTab: ["achievementList"],
    };

    // Setup tab switching
    Object.entries(tabs).forEach(([tabId, sections]) => {
      const tab = document.getElementById(tabId);
      if (tab) {
        tab.addEventListener("click", async () => {
          // Hide all tabs and sections
          Object.keys(tabs).forEach((t) => {
            document.getElementById(t).classList.remove("checked");
            tabs[t].forEach((id) => {
              const el = document.getElementById(id);
              if (el) el.style.display = "none";
            });
          });
          // Show selected tab and sections
          tab.classList.add("checked");
          sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.style.display = "block";
          });

          // Manage add buttons visibility
          const addButtons = {
            ExperienceTab: "moreExBtn_EX",
            CertificatesTab: "moreExBtn_SP",
            EducationTab: "moreExBtn_Edu",
            RatingsTab: "moreExBtn_Rating",
            AchievementsTab: "moreExBtn_Achievement",
          };
          Object.values(addButtons).forEach((btnId) => {
            const btn = document.getElementById(btnId);
            if (btn) btn.style.display = "none";
          });
          if (addButtons[tabId]) {
            document.getElementById(addButtons[tabId]).style.display = "block";
          }

          // Load data for list tabs
          const sectionMap = {
            ExperienceTab: "experiences",
            CertificatesTab: "certifications",
            EducationTab: "education",
            RatingsTab: "ratings",
            AchievementsTab: "achievements",
          };
          if (sectionMap[tabId]) {
            await loadSectionData(
              sectionMap[tabId],
              `#${sectionMap[tabId]}Container`,
              sectionMap[tabId] === "ratings"
                ? renderRating
                : sectionMap[tabId] === "achievements"
                ? renderAchievement
                : sectionMap[tabId] === "experiences"
                ? renderExperience
                : sectionMap[tabId] === "certifications"
                ? renderCertificate
                : renderEducation,
              `#${sectionMap[tabId]}List`
            );
          }
        });
      }
    });

    // Handle Professional Form Submission
    const professionalForm = document.getElementById("professionalForm");
    if (professionalForm) {
      professionalForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Validate form inputs
        if (!validateForm(professionalForm, "professional")) return;

        // Prepare data for API
        const data = {
          name: professionalForm.querySelector("#mentor_name").value.trim(),
          gender: professionalForm.querySelector("#gender").value,
          country: professionalForm.querySelector("#country").value,
          bio: professionalForm.querySelector("#about_me").value.trim(),
        };

        try {
          const token = localStorage.getItem("authToken");
          const decodedToken = common.decodeJWT(token);
          const userId = decodedToken?.sub || decodedToken?.id;

          // Update user profile via API
          const response = await fetch(
            `https://tawgeeh-v1-production.up.railway.app/users/${userId}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );
          await window.auth.handleApiError(response);

          // Show success message and refresh profile
          common.showAlert(
            "تم",
            "تم تحديث المعلومات الأساسية بنجاح",
            "success"
          );
          hidePopup("editProfileInfo");
          await loadUserProfile();
        } catch (error) {
          console.error("Professional form submission error:", error.message);
        }
      });
    }

    // Handle Social Form Submission
    const socialForm = document.getElementById("socialForm");
    if (socialForm) {
      socialForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Validate social media links
        if (!validateForm(socialForm, "social")) return;

        // Prepare data for API
        const data = {
          linkedin: socialForm.querySelector("#linkedin").value.trim() || null,
          behance: socialForm.querySelector("#behance").value.trim() || null,
          github: socialForm.querySelector("#github").value.trim() || null,
          instagram:
            socialForm.querySelector("#instagram").value.trim() || null,
        };

        try {
          const token = localStorage.getItem("authToken");
          const decodedToken = common.decodeJWT(token);
          const userId = decodedToken?.sub || decodedToken?.id;

          // Update social links via API
          const response = await fetch(
            `https://tawgeeh-v1-production.up.railway.app/users/${userId}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );
          await window.auth.handleApiError(response);

          // Show success message and refresh profile
          common.showAlert(
            "تم",
            "تم تحديث الروابط الاجتماعية بنجاح",
            "success"
          );
          hidePopup("editProfileInfo");
          await loadUserProfile();
        } catch (error) {
          console.error("Social form submission error:", error.message);
        }
      });
    }
  }

  // Initialize Experience Popup and Form Handler
  function initializeExperiencePopup() {
    // Setup popup elements
    const popup = document.getElementById("editProfileEx_edit2");
    const editListPopup = document.getElementById("editProfileEx_edit");
    const closeBtn = document.getElementById("closeBtn4");
    const closeListBtn = document.getElementById("closeBtn3");
    const overlay = popup?.parentElement;
    const listOverlay = editListPopup?.parentElement;

    // Handle close buttons and overlay clicks
    if (closeBtn)
      closeBtn.addEventListener("click", () =>
        hidePopup("editProfileEx_edit2")
      );
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) hidePopup("editProfileEx_edit2");
      });
    }
    if (closeListBtn)
      closeListBtn.addEventListener("click", () =>
        hidePopup("editProfileEx_edit")
      );
    if (listOverlay) {
      listOverlay.addEventListener("click", (e) => {
        if (e.target === listOverlay) hidePopup("editProfileEx_edit");
      });
    }

    // Handle Experience Form Submission
    const form = document.getElementById("experienceForm");
    if (form) {
      // Toggle end date based on "currently working" checkbox
      const currentlyWorking = form.querySelector("#currentlyWorking");
      const endDateInput = form.querySelector("#expEndDate");
      if (currentlyWorking) {
        currentlyWorking.addEventListener("change", (e) => {
          endDateInput.disabled = e.target.checked;
          if (e.target.checked) endDateInput.value = "";
        });
      }

      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Validate form inputs
        if (!validateForm(form, "experience")) return;

        // Prepare data for API
        const data = {
          jobTitle: form.querySelector("#title").value.trim(),
          companyName: form.querySelector("#companyName").value.trim(),
          startDate: form.querySelector("#expStartDate").value,
          endDate: currentlyWorking.checked
            ? null
            : form.querySelector("#expEndDate").value || null,
          description: form.querySelector("#expDescription").value.trim(),
        };

        try {
          const token = localStorage.getItem("authToken");
          // Determine if creating new or updating existing experience
          const method = form.dataset.id ? "PATCH" : "POST";
          const url = form.dataset.id
            ? `https://tawgeeh-v1-production.up.railway.app/experiences/${form.dataset.id}`
            : `https://tawgeeh-v1-production.up.railway.app/experiences`;

          // Submit experience data to API
          const response = await fetch(url, {
            method,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          await window.auth.handleApiError(response);

          // Show success message and refresh experiences
          common.showAlert("تم", "تم حفظ الخبرة بنجاح", "success");
          dataCache.experiences = null; // Clear cache
          hidePopup("editProfileEx_edit2");
          await loadSectionData(
            "experiences",
            "#experiencesContainer",
            renderExperience,
            "#experienceList"
          );
        } catch (error) {
          console.error("Experience form submission error:", error.message);
        }
      });
    }
  }

  // Initialize Certificate Popup and Form Handler
  function initializeCertificatePopup() {
    // Setup popup elements
    const popup = document.getElementById("editProfileSp_add");
    const editListPopup = document.getElementById("editProfileSp_edit");
    const closeBtn = document.getElementById("closeBtn5");
    const closeListBtn = document.getElementById("closeBtn9");
    const overlay = popup?.parentElement;
    const listOverlay = editListPopup?.parentElement;

    // Handle close buttons and overlay clicks
    if (closeBtn)
      closeBtn.addEventListener("click", () => hidePopup("editProfileSp_add"));
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) hidePopup("editProfileSp_add");
      });
    }
    if (closeListBtn)
      closeListBtn.addEventListener("click", () =>
        hidePopup("editProfileSp_edit")
      );
    if (listOverlay) {
      listOverlay.addEventListener("click", (e) => {
        if (e.target === listOverlay) hidePopup("editProfileSp_edit");
      });
    }

    // Handle Certificate Form Submission
    const form = document.getElementById("certificateForm");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Validate form inputs
        if (!validateForm(form, "certificate")) return;

        // Prepare data for API
        const data = {
          name: form.querySelector("#certificateName").value.trim(),
          issuingAuthority: form
            .querySelector("#issuingAuthority")
            .value.trim(),
          issueDate: form.querySelector("#certStartDate").value,
          expiryDate: form.querySelector("#certEndDate").value || null,
          certificateLink:
            form.querySelector("#certificateLink").value.trim() || null,
          image_url:
            "https://i.pinimg.com/736x/18/c6/e0/18c6e05ccc51b8e8e8385d0b38105d83.jpg",
        };

        try {
          const token = localStorage.getItem("authToken");
          // Determine if creating new or updating existing certificate
          const method = form.dataset.id ? "PATCH" : "POST";
          const url = form.dataset.id
            ? `https://tawgeeh-v1-production.up.railway.app/certifications/${form.dataset.id}`
            : `https://tawgeeh-v1-production.up.railway.app/certifications`;

          // Submit certificate data to API
          const response = await fetch(url, {
            method,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          await window.auth.handleApiError(response);

          // Show success message and refresh certificates
          common.showAlert("تم", "تم حفظ الشهادة بنجاح", "success");
          dataCache.certifications = null; // Clear cache
          hidePopup("editProfileSp_add");
          await loadSectionData(
            "certifications",
            "#certificatesContainer",
            renderCertificate,
            "#certificateList"
          );
        } catch (error) {
          console.error("Certificate form submission error:", error.message);
        }
      });
    }
  }

  // Initialize Education Popup and Form Handler
  function initializeEducationPopup() {
    // Setup popup elements
    const popup = document.getElementById("editProfileEdu_add");
    const editListPopup = document.getElementById("editProfileEdu_edit");
    const closeBtn = document.getElementById("closeBtn6");
    const closeListBtn = document.getElementById("closeBtn7");
    const overlay = popup?.parentElement;
    const listOverlay = editListPopup?.parentElement;

    // Handle close buttons and overlay clicks
    if (closeBtn)
      closeBtn.addEventListener("click", () => hidePopup("editProfileEdu_add"));
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) hidePopup("editProfileEdu_add");
      });
    }
    if (closeListBtn)
      closeListBtn.addEventListener("click", () =>
        hidePopup("editProfileEdu_edit")
      );
    if (listOverlay) {
      listOverlay.addEventListener("click", (e) => {
        if (e.target === listOverlay) hidePopup("editProfileEdu_edit");
      });
    }

    // Handle Education Form Submission
    const form = document.getElementById("educationForm");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Validate form inputs
        if (!validateForm(form, "education")) return;

        // Prepare data for API
        const data = {
          degree: form.querySelector("#degree").value.trim(),
          institution: form.querySelector("#institution").value.trim(),
          field: form.querySelector("#field").value.trim(),
          startDate: form.querySelector("#eduStartDate").value,
          endDate: form.querySelector("#eduEndDate").value || null,
        };

        try {
          const token = localStorage.getItem("authToken");
          // Determine if creating new or updating existing education
          const method = form.dataset.id ? "PATCH" : "POST";
          const url = form.dataset.id
            ? `https://tawgeeh-v1-production.up.railway.app/education/${form.dataset.id}`
            : `https://tawgeeh-v1-production.up.railway.app/education`;

          // Submit education data to API
          const response = await fetch(url, {
            method,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          await window.auth.handleApiError(response);

          // Show success message and refresh education
          common.showAlert("تم", "تم حفظ التعليم بنجاح", "success");
          dataCache.education = null; // Clear cache
          hidePopup("editProfileEdu_add");
          await loadSectionData(
            "education",
            "#educationContainer",
            renderEducation,
            "#educationList"
          );
        } catch (error) {
          console.error("Education form submission error:", error.message);
        }
      });
    }
  }

  // Initialize Rating Popup and Form Handler
  function initializeRatingPopup() {
    // Setup popup elements
    const popup = document.getElementById("editProfileRating_add");
    const editListPopup = document.getElementById("editProfileRating_edit");
    const closeBtn = document.getElementById("closeBtn10");
    const closeListBtn = document.getElementById("closeBtn11");
    const overlay = popup?.parentElement;
    const listOverlay = editListPopup?.parentElement;

    // Handle close buttons and overlay clicks
    if (closeBtn)
      closeBtn.addEventListener("click", () =>
        hidePopup("editProfileRating_add")
      );
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) hidePopup("editProfileRating_add");
      });
    }
    if (closeListBtn)
      closeListBtn.addEventListener("click", () =>
        hidePopup("editProfileRating_edit")
      );
    if (listOverlay) {
      listOverlay.addEventListener("click", (e) => {
        if (e.target === listOverlay) hidePopup("editProfileRating_edit");
      });
    }

    // Handle Rating Form Submission
    const form = document.getElementById("ratingForm");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Validate form inputs
        if (!validateForm(form, "rating")) return;

        // Prepare data for API
        const data = {
          reviewerName: form.querySelector("#reviewerName").value.trim(),
          comment: form.querySelector("#comment").value.trim(),
          rating: parseInt(form.querySelector("#ratingScore").value),
        };

        try {
          const token = localStorage.getItem("authToken");
          const decodedToken = common.decodeJWT(token);
          const userId = decodedToken?.sub || decodedToken?.id;
          // Determine if creating new or updating existing rating
          const method = form.dataset.id ? "PATCH" : "POST";
          const url = form.dataset.id
            ? `https://tawgeeh-v1-production.up.railway.app/ratings/${form.dataset.id}`
            : `https://tawgeeh-v1-production.up.railway.app/ratings/${userId}`;

          // Submit rating data to API
          const response = await fetch(url, {
            method,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          await window.auth.handleApiError(response);

          // Show success message and refresh ratings
          common.showAlert("تم", "تم حفظ التقييم بنجاح", "success");
          dataCache.ratings = null; // Clear cache
          hidePopup("editProfileRating_add");
          await loadSectionData(
            "ratings",
            "#ratingContent",
            renderRating,
            "#ratingList"
          );
        } catch (error) {
          console.error("Rating form submission error:", error.message);
        }
      });
    }
  }

  // Initialize Achievement Popup and Form Handler
  function initializeAchievementPopup() {
    // Setup popup elements
    const popup = document.getElementById("editProfileAchievement_add");
    const editListPopup = document.getElementById(
      "editProfileAchievement_edit"
    );
    const closeBtn = document.getElementById("closeBtn12");
    const closeListBtn = document.getElementById("closeBtn13");
    const overlay = popup?.parentElement;
    const listOverlay = editListPopup?.parentElement;

    // Handle close buttons and overlay clicks
    if (closeBtn)
      closeBtn.addEventListener("click", () =>
        hidePopup("editProfileAchievement_add")
      );
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) hidePopup("editProfileAchievement_add");
      });
    }
    if (closeListBtn)
      closeListBtn.addEventListener("click", () =>
        hidePopup("editProfileAchievement_edit")
      );
    if (listOverlay) {
      listOverlay.addEventListener("click", (e) => {
        if (e.target === listOverlay) hidePopup("editProfileAchievement_edit");
      });
    }

    // Handle Achievement Form Submission
    const form = document.getElementById("achievementForm");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Validate form inputs
        if (!validateForm(form, "achievement")) return;

        // Prepare data for API
        const data = {
          title: form.querySelector("#achievementTitle").value.trim(),
          description: form
            .querySelector("#achievementDescription")
            .value.trim(),
          achievedAt: form.querySelector("#achievedAt").value,
        };

        try {
          const token = localStorage.getItem("authToken");
          // Determine if creating new or updating existing achievement
          const method = form.dataset.id ? "PATCH" : "POST";
          const url = form.dataset.id
            ? `https://tawgeeh-v1-production.up.railway.app/achievements/${form.dataset.id}`
            : `https://tawgeeh-v1-production.up.railway.app/achievements`;

          // Submit achievement data to API
          const response = await fetch(url, {
            method,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          await window.auth.handleApiError(response);

          // Show success message and refresh achievements
          common.showAlert("تم", "تم حفظ الإنجاز بنجاح", "success");
          dataCache.achievements = null; // Clear cache
          hidePopup("editProfileAchievement_add");
          await loadSectionData(
            "achievements",
            "#achievementsContent",
            renderAchievement,
            "#achievementList"
          );
        } catch (error) {
          console.error("Achievement form submission error:", error.message);
        }
      });
    }
  }

  // Delete item from a section
  async function deleteItem(section, id, containerId, listId, renderFn) {
    try {
      const token = localStorage.getItem("authToken");
      // Send delete request to API
      const response = await fetch(
        `https://tawgeeh-v1-production.up.railway.app/${section}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await window.auth.handleApiError(response);

      // Show success message and refresh section
      common.showAlert("تم", "تم الحذف بنجاح", "success");
      dataCache[section] = null; // Clear cache
      await loadSectionData(section, containerId, renderFn, listId);
    } catch (error) {
      console.error(`Delete ${section} error:`, error.message);
    }
  }

  // Like a rating
  async function likeRating(id) {
    try {
      const token = localStorage.getItem("authToken");
      // Send like request to API
      const response = await fetch(
        `https://tawgeeh-v1-production.up.railway.app/ratings/${id}/like`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await window.auth.handleApiError(response);

      // Show success message and refresh ratings
      common.showAlert("تم", "تم الإعجاب بالتقييم", "success");
      dataCache.ratings = null; // Clear cache
      await loadSectionData(
        "ratings",
        "#ratingContent",
        renderRating,
        "#ratingList"
      );
    } catch (error) {
      console.error("Like rating error:", error.message);
    }
  }

  // Initialize Image Upload Handlers
  function initializeImageUpload() {
    const uploadImage = document.getElementById("uploadImage");
    const uploadImageBackground = document.getElementById(
      "uploadImageBackground"
    );
    const profileImagePreview = document.getElementById("profileImagePreview");
    const editBtnMain = document.getElementById("editBtnMain");
    const removeProfileImage = document.getElementById("removeProfileImage");
    const videoInput = document.getElementById("videoInput");

    // Handle profile image upload
    if (uploadImage && profileImagePreview) {
      uploadImage.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (file && file.size > 2 * 1024 * 1024) {
          common.showAlert(
            "خطأ",
            "حجم الصورة يجب أن يكون أقل من 2 ميجا بايت",
            "error"
          );
          return;
        }

        try {
          const formData = new FormData();
          formData.append("image", file);
          const token = localStorage.getItem("authToken");
          const decodedToken = common.decodeJWT(token);
          const userId = decodedToken?.sub || decodedToken?.id;

          // Upload profile image to API
          const response = await fetch(
            `https://tawgeeh-v1-production.up.railway.app/users/${userId}/upload-image`,
            {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
              body: formData,
            }
          );
          await window.auth.handleApiError(response);
          const data = await response.json();
          profileImagePreview.src = data.image_url;
          await loadUserProfile();
        } catch (error) {
          console.error("Image upload error:", error.message);
        }
      });
    }

    // Handle background image upload
    if (uploadImageBackground) {
      uploadImageBackground.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
          const formData = new FormData();
          formData.append("image", file);
          const token = localStorage.getItem("authToken");
          const decodedToken = common.decodeJWT(token);
          const userId = decodedToken?.sub || decodedToken?.id;

          // Upload background image to API
          const response = await fetch(
            `https://tawgeeh-v1-production.up.railway.app/users/${userId}/upload-background-image`,
            {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
              body: formData,
            }
          );
          await window.auth.handleApiError(response);
          const data = await response.json();
          document.getElementById("background_image").src =
            data.background_image_url;
          await loadUserProfile();
        } catch (error) {
          console.error("Background image upload error:", error.message);
        }
      });
    }

    // Handle video upload
    if (videoInput) {
      videoInput.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (
          file &&
          file.type.includes("mp4") &&
          file.size <= 25 * 1024 * 1024
        ) {
          try {
            const formData = new FormData();
            formData.append("video", file);
            const token = localStorage.getItem("authToken");
            const decodedToken = common.decodeJWT(token);
            const userId = decodedToken?.sub || decodedToken?.id;

            // Upload video to API
            const response = await fetch(
              `https://tawgeeh-v1-production.up.railway.app/users/${userId}/upload-video`,
              {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
              }
            );
            await window.auth.handleApiError(response);
            const data = await response.json();
            const videoPlayer = document.getElementById("videoPlayer");
            videoPlayer.src = data.video_url;
            videoPlayer.style.display = "block";
            document.getElementById("uplodimage").style.display = "none";
            document.getElementById("uplodeBtn").style.display = "none";
            document.getElementById("size").style.display = "none";
            await loadUserProfile();
          } catch (error) {
            console.error("Video upload error:", error.message);
          }
        } else {
          common.showAlert(
            "خطأ",
            "يجب أن يكون الفيديو بصيغة MP4 وحجمه أقل من 25 ميجابايت",
            "error"
          );
        }
      });
    }

    // Trigger file input for profile image
    if (editBtnMain)
      editBtnMain.addEventListener("click", () => uploadImage.click());

    // Handle profile image removal
    if (removeProfileImage) {
      removeProfileImage.addEventListener("click", async () => {
        try {
          const token = localStorage.getItem("authToken");
          const decodedToken = common.decodeJWT(token);
          const userId = decodedToken?.sub || decodedToken?.id;

          // Remove profile image via API
          const response = await fetch(
            `https://tawgeeh-v1-production.up.railway.app/users/${userId}/remove-image`,
            {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          await window.auth.handleApiError(response);
          profileImagePreview.src = "../mentor-images/personal_image.png";
          await loadUserProfile();
        } catch (error) {
          console.error("Image removal error:", error.message);
        }
      });
    }
  }

  // Switch between profile tabs
  async function switchTab(tabName) {
    const tabs = {
      overview: {
        content: "overviewContent",
        tab: "overviewTab",
        section: null,
      },
      services: {
        content: "servicesContent",
        tab: "manageservices",
        section: null,
      },
      rating: {
        content: "ratingContent",
        tab: "ratingTab",
        section: "ratings",
      },
      achievements: {
        content: "achievementsContent",
        tab: "achievementsTab",
        section: "achievements",
      },
    };

    // Hide all tabs and content
    Object.values(tabs).forEach(({ content, tab }) => {
      const contentElement = document.getElementById(content);
      if (contentElement) contentElement.style.display = "none";
      const tabElement = document.getElementById(tab);
      if (tabElement) tabElement.classList.remove("checked");
    });

    // Show selected tab and content
    const selectedContent = document.getElementById(tabs[tabName].content);
    const selectedTab = document.getElementById(tabs[tabName].tab);
    if (selectedContent) selectedContent.style.display = "block";
    if (selectedTab) selectedTab.classList.add("checked");

    // Load data for section if applicable
    if (tabs[tabName].section) {
      await loadSectionData(
        tabs[tabName].section,
        `#${tabs[tabName].content}`,
        tabs[tabName].section === "ratings" ? renderRating : renderAchievement,
        `#${tabs[tabName].section}List`
      );
    }
  }

  // Initialize Event Listeners
  function initializeEventListeners() {
    // Open modal buttons
    const openModalConfigs = [
      {
        btnId: "editBtn",
        modalId: "editProfileInfo",
        screenId: "professionalForm",
      },
      {
        btnId: "editBtnMain",
        modalId: "editProfileInfo",
        screenId: "professionalForm",
      },
      {
        btnId: "edit_2BtnExp",
        modalId: "editProfileEx_edit",
        screenId: "experienceList",
      },
      {
        btnId: "edit_addExp",
        modalId: "editProfileEx_edit2",
        screenId: "experienceFormScreen",
      },
      {
        btnId: "moreExBtn_EX",
        modalId: "editProfileEx_edit2",
        screenId: "experienceFormScreen",
      },
      {
        btnId: "edit_2BtnCert",
        modalId: "editProfileSp_edit",
        screenId: "certificateList",
      },
      {
        btnId: "edit_addCert",
        modalId: "editProfileSp_add",
        screenId: "certificateFormScreen",
      },
      {
        btnId: "moreExBtn_SP",
        modalId: "editProfileSp_add",
        screenId: "certificateFormScreen",
      },
      {
        btnId: "edit_2BtnEdu",
        modalId: "editProfileEdu_edit",
        screenId: "educationList",
      },
      {
        btnId: "edit_addEdu",
        modalId: "editProfileEdu_add",
        screenId: "educationFormScreen",
      },
      {
        btnId: "moreExBtn_Edu",
        modalId: "editProfileEdu_add",
        screenId: "educationFormScreen",
      },
      {
        btnId: "edit_2BtnRating",
        modalId: "editProfileRating_edit",
        screenId: "ratingList",
      },
      {
        btnId: "edit_addRating",
        modalId: "editProfileRating_add",
        screenId: "ratingFormScreen",
      },
      {
        btnId: "moreExBtn_Rating",
        modalId: "editProfileRating_add",
        screenId: "ratingFormScreen",
      },
      {
        btnId: "edit_2BtnAchievement",
        modalId: "editProfileAchievement_edit",
        screenId: "achievementList",
      },
      {
        btnId: "edit_addAchievement",
        modalId: "editProfileAchievement_add",
        screenId: "achievementFormScreen",
      },
      {
        btnId: "moreExBtn_Achievement",
        modalId: "editProfileAchievement_add",
        screenId: "achievementFormScreen",
      },
      {
        btnId: "edit_bigimage",
        modalId: null,
        action: () => document.getElementById("uploadImageBackground").click(),
      },
    ];

    openModalConfigs.forEach((config) => {
      const button = document.getElementById(config.btnId);
      if (button) {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          if (config.modalId) {
            const form = document.getElementById(
              config.screenId.replace("Screen", "")
            );
            if (form) delete form.dataset.id;
            showPopup(config.modalId, config.screenId);
          } else if (config.action) {
            config.action();
          }
        });
      }
    });

    // Close modal buttons
    const closeModalConfigs = [
      { btnId: "closeBtn1", modalId: "editProfileInfo" },
      { btnId: "closeBtn3", modalId: "editProfileEx_edit" },
      { btnId: "closeBtn4", modalId: "editProfileEx_edit2" },
      { btnId: "closeBtn5", modalId: "editProfileSp_add" },
      { btnId: "closeBtn6", modalId: "editProfileEdu_add" },
      { btnId: "closeBtn7", modalId: "editProfileEdu_edit" },
      { btnId: "closeBtn9", modalId: "editProfileSp_edit" },
      { btnId: "closeBtn10", modalId: "editProfileRating_add" },
      { btnId: "closeBtn11", modalId: "editProfileRating_edit" },
      { btnId: "closeBtn12", modalId: "editProfileAchievement_add" },
      { btnId: "closeBtn13", modalId: "editProfileAchievement_edit" },
    ];

    closeModalConfigs.forEach((config) => {
      const button = document.getElementById(config.btnId);
      if (button) {
        button.addEventListener("click", () => hidePopup(config.modalId));
      }
    });

    // Handle edit and delete for experiences
    document
      .querySelector("#experienceList")
      ?.addEventListener("click", async (e) => {
        if (e.target.classList.contains("edit-exp")) {
          const id = e.target.dataset.id;
          try {
            const token = localStorage.getItem("authToken");
            // Fetch experience data for editing
            const response = await fetch(
              `https://tawgeeh-v1-production.up.railway.app/experiences/${id}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            await window.auth.handleApiError(response);
            const data = await response.json();

            // Populate form with existing data
            const form = document.getElementById("experienceForm");
            if (form) form.dataset.id = id;
            showPopup("editProfileEx_edit2", "experienceFormScreen", {
              title: data.jobTitle || data.title,
              companyName: data.companyName || data.company,
              expStartDate: data.startDate,
              expEndDate: data.endDate || "",
              expDescription: data.description,
              currentlyWorking: !data.endDate,
            });
          } catch (error) {
            console.error("Fetch experience error:", error.message);
          }
        } else if (e.target.classList.contains("delete-exp")) {
          if (confirm("هل أنت متأكد من حذف هذه الخبرة؟")) {
            await deleteItem(
              "experiences",
              e.target.dataset.id,
              "#experiencesContainer",
              "#experienceList",
              renderExperience
            );
          }
        }
      });

    // Handle edit and delete for certificates
    document
      .querySelector("#certificateList")
      ?.addEventListener("click", async (e) => {
        if (e.target.classList.contains("edit-cert")) {
          const id = e.target.dataset.id;
          try {
            const token = localStorage.getItem("authToken");
            // Fetch certificate data for editing
            const response = await fetch(
              `https://tawgeeh-v1-production.up.railway.app/certifications/${id}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            await window.auth.handleApiError(response);
            const data = await response.json();

            // Populate form with existing data
            const form = document.getElementById("certificateForm");
            if (form) form.dataset.id = id;
            showPopup("editProfileSp_add", "certificateFormScreen", {
              certificateName: data.name,
              issuingAuthority: data.issuingAuthority || data.issuer,
              certStartDate: data.issueDate,
              certEndDate: data.expiryDate || "",
              certificateLink: data.certificateLink || data.url,
            });
          } catch (error) {
            console.error("Fetch certificate error:", error.message);
          }
        } else if (e.target.classList.contains("delete-cert")) {
          if (confirm("هل أنت متأكد من حذف هذه الشهادة؟")) {
            await deleteItem(
              "certifications",
              e.target.dataset.id,
              "#certificatesContainer",
              "#certificateList",
              renderCertificate
            );
          }
        }
      });

    // Handle edit and delete for education
    document
      .querySelector("#educationList")
      ?.addEventListener("click", async (e) => {
        if (e.target.classList.contains("edit-edu")) {
          const id = e.target.dataset.id;
          try {
            const token = localStorage.getItem("authToken");
            // Fetch education data for editing
            const response = await fetch(
              `https://tawgeeh-v1-production.up.railway.app/education/${id}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            await window.auth.handleApiError(response);
            const data = await response.json();

            // Populate form with existing data
            const form = document.getElementById("educationForm");
            if (form) form.dataset.id = id;
            showPopup("editProfileEdu_add", "educationFormScreen", {
              degree: data.degree,
              institution: data.institution,
              field: data.field,
              eduStartDate: data.startDate,
              eduEndDate: data.endDate || "",
            });
          } catch (error) {
            console.error("Fetch education error:", error.message);
          }
        } else if (e.target.classList.contains("delete-edu")) {
          if (confirm("هل أنت متأكد من حذف هذا التعليم؟")) {
            await deleteItem(
              "education",
              e.target.dataset.id,
              "#educationContainer",
              "#educationList",
              renderEducation
            );
          }
        }
      });

    // Handle edit, delete, and like for ratings
    document
      .querySelector("#ratingList")
      ?.addEventListener("click", async (e) => {
        if (e.target.classList.contains("edit-btn")) {
          const id = e.target.dataset.id;
          try {
            const token = localStorage.getItem("authToken");
            // Fetch rating data for editing
            const response = await fetch(
              `https://tawgeeh-v1-production.up.railway.app/ratings/${id}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            await window.auth.handleApiError(response);
            const data = await response.json();

            // Populate form with existing data
            const form = document.getElementById("ratingForm");
            if (form) form.dataset.id = id;
            showPopup("editProfileRating_add", "ratingFormScreen", {
              reviewerName: data.reviewerName || data.menteeName,
              comment: data.comment,
              ratingScore: data.rating,
            });
          } catch (error) {
            console.error("Fetch rating error:", error.message);
          }
        } else if (e.target.classList.contains("delete-btn")) {
          if (confirm("هل أنت متأكد من حذف هذا التقييم؟")) {
            await deleteItem(
              "ratings",
              e.target.dataset.id,
              "#ratingContent",
              "#ratingList",
              renderRating
            );
          }
        } else if (e.target.classList.contains("like-btn")) {
          await likeRating(e.target.dataset.id);
        }
      });

    // Handle edit and delete for achievements
    document
      .querySelector("#achievementList")
      ?.addEventListener("click", async (e) => {
        if (e.target.classList.contains("edit-btn")) {
          const id = e.target.dataset.id;
          try {
            const token = localStorage.getItem("authToken");
            // Fetch achievement data for editing
            const response = await fetch(
              `https://tawgeeh-v1-production.up.railway.app/achievements/${id}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            await window.auth.handleApiError(response);
            const data = await response.json();

            // Populate form with existing data
            const form = document.getElementById("achievementForm");
            if (form) form.dataset.id = id;
            showPopup("editProfileAchievement_add", "achievementFormScreen", {
              achievementTitle: data.title,
              achievementDescription: data.description,
              achievedAt: data.achievedAt || data.date,
            });
          } catch (error) {
            console.error("Fetch achievement error:", error.message);
          }
        } else if (e.target.classList.contains("delete-btn")) {
          if (confirm("هل أنت متأكد من حذف هذا الإنجاز؟")) {
            await deleteItem(
              // Continuation of initializeEventListeners function

              // Complete the achievement deletion handler
              "#achievementList",
              renderAchievement
            );
          }
        }
      });

    // Tab switching for profile sections
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", async () => {
        const tabName = tab.id.replace("Tab", "");
        await switchTab(tabName);
      });
    });
  }

  // Initialize all components
  async function initialize() {
    // Load initial user profile data
    await loadUserProfile();

    // Initialize popups and form handlers
    initializeProfilePopup();
    initializeExperiencePopup();
    initializeCertificatePopup();
    initializeEducationPopup();
    initializeRatingPopup();
    initializeAchievementPopup();

    // Initialize image upload handlers
    initializeImageUpload();

    // Setup event listeners for buttons and interactions
    initializeEventListeners();

    // Load initial section data
    await Promise.all([
      loadSectionData(
        "experiences",
        "#experiencesContainer",
        renderExperience,
        "#experienceList"
      ),
      loadSectionData(
        "certifications",
        "#certificatesContainer",
        renderCertificate,
        "#certificateList"
      ),
      loadSectionData(
        "education",
        "#educationContainer",
        renderEducation,
        "#educationList"
      ),
      loadSectionData("ratings", "#ratingContent", renderRating, "#ratingList"),
      loadSectionData(
        "achievements",
        "#achievementsContent",
        renderAchievement,
        "#achievementList"
      ),
    ]);

    // Set default tab
    await switchTab("overview");
  }

  // Run initialization
  initialize().catch((error) =>
    console.error("Initialization error:", error.message)
  );
});
