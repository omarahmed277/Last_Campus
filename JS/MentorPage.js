document.addEventListener("DOMContentLoaded", async function () {
  // Initialize notifications
  let notificationsData = [];
  try {
    notificationsData = await window.auth.fetchNotifications();
    console.log("Notifications loaded:", notificationsData);
  } catch (error) {
    console.error("Failed to fetch notifications:", error.message);
    notificationsData = [];
  }

  // Initialize authentication
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
  } else {
    console.warn("Auth section not found");
  }

  // Initialize Flatpickr for date inputs
  function initializeFlatpickr() {
    const dateInputs = document.querySelectorAll(".date-start, .date-end");
    dateInputs.forEach((input) => {
      flatpickr(input, {
        locale: "ar",
        dateFormat: "Y-m-d",
        allowInput: true,
        altInput: true,
        altFormat: "d/m/Y",
        onChange: function (selectedDates, dateStr, instance) {
          const pairId = input.dataset.pair;
          if (pairId) {
            const pairInput = document.getElementById(pairId);
            if (pairInput && input.classList.contains("date-start")) {
              pairInput._flatpickr.set("minDate", dateStr);
            }
          }
        },
      });
    });
  }

  // Fetch and display user profile data
  async function loadUserProfile() {
    const profileContainer = document.querySelector("#profile-hero");
    if (!profileContainer) {
      console.warn("Profile container not found");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No auth token found");
      common.showLoginPopup();
      return;
    }

    try {
      const userData = await common.fetchUserData(token);
      console.log("User profile data:", userData);

      const image1 = profileContainer.querySelector("#image1");
      const mentorName = profileContainer.querySelector(".mentor_name");
      const mentorJob = profileContainer.querySelector("#mentor_jop");
      const mentorBio = document.querySelector("#mentorBio");
      const linkedinLink = profileContainer.querySelector("#linkedinLink");
      const behanceLink = profileContainer.querySelector("#behanceLink");
      const githubLink = profileContainer.querySelector("#githubLink");
      const instagramLink = profileContainer.querySelector("#instagramLink");

      if (image1)
        image1.src = common.sanitizeHTML(
          userData.image_url || "../mentor-images/freepik__adjust__7471.svg"
        );
      if (mentorName)
        mentorName.textContent = common.sanitizeHTML(
          userData.name || "المرشد الأول"
        );
      if (mentorJob)
        mentorJob.textContent = common.sanitizeHTML(
          userData.specialization || "غير محدد"
        );
      if (mentorBio)
        mentorBio.textContent = common.sanitizeHTML(
          userData.bio || "لا توجد نبذة"
        );
      if (linkedinLink)
        linkedinLink.href = common.sanitizeHTML(userData.linkedin || "#");
      if (behanceLink)
        behanceLink.href = common.sanitizeHTML(userData.behance || "#");
      if (githubLink)
        githubLink.href = common.sanitizeHTML(userData.github || "#");
      if (instagramLink)
        instagramLink.href = common.sanitizeHTML(userData.instagram || "#");
    } catch (error) {
      console.error("Failed to load user profile:", error.message);
      common.showAlert(
        "خطأ",
        "فشل تحميل بيانات الملف الشخصي. حاول مرة أخرى.",
        "error"
      );
    }
  }

  // Fetch and render section data
  async function loadSectionData(section, containerId, renderFn, listId) {
    const container = document.querySelector(containerId);
    const listContainer = document.querySelector(listId);
    if (!container || !listContainer) {
      console.warn(`${section} container or list not found`);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const decodedToken = common.decodeJWT(token);
      const userId = decodedToken?.sub || decodedToken?.id;
      if (!userId) throw new Error("Invalid token: User ID not found");

      const endpoint =
        section === "education"
          ? `/education/${userId}`
          : `/${section}/${userId}`;
      const response = await fetch(
        `https://tawgeeh-v1-production.up.railway.app${endpoint}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await window.auth.handleApiError(response);
      const data = await response.json();
      console.log(`${section} data:`, data);

      container.innerHTML = "";
      listContainer.innerHTML = "";
      const items = data[section] || data || [];
      if (items.length === 0) {
        // For education, experiences, and ratings, just clear containers
        container.innerHTML = "";
        listContainer.innerHTML = "";
      } else {
        items.forEach((item) => {
          renderFn(container, item, false);
          renderFn(listContainer, item, true);
        });
      }
    } catch (error) {
      console.error(`Failed to load ${section}:`, error.message);
      container.innerHTML = "";
      listContainer.innerHTML = "";
      // No popup or alert on error, just clear containers
    }
  }

  // Render functions
  function renderExperience(container, item, isList) {
    const div = document.createElement("div");
    div.className = isList ? "experience-list-item" : "experience-item";
    div.innerHTML = `
      <h3>${common.sanitizeHTML(item.title || "غير محدد")}</h3>
      <p>${common.sanitizeHTML(item.company || "غير محدد")}</p>
      <p>${common.sanitizeHTML(item.startDate || "غير محدد")} - ${
      item.endDate ? common.sanitizeHTML(item.endDate) : "الآن"
    }</p>
      <p>${common.sanitizeHTML(item.description || "لا يوجد وصف")}</p>
      ${
        isList
          ? `
        <button class="edit-btn" data-id="${item.id}">تعديل</button>
        <button class="delete-btn" data-id="${item.id}">حذف</button>
      `
          : ""
      }
    `;
    container.appendChild(div);
  }

  function renderCertificate(container, item, isList) {
    const div = document.createElement("div");
    div.className = isList ? "certificate-list-item" : "certificate-item";
    div.innerHTML = `
      <h3>${common.sanitizeHTML(item.name || "غير محدد")}</h3>
      <p>${common.sanitizeHTML(item.issuer || "غير محدد")}</p>
      <p>تاريخ الإصدار: ${common.sanitizeHTML(item.issueDate || "غير محدد")}</p>
      ${
        item.expiryDate
          ? `<p>تاريخ الانتهاء: ${common.sanitizeHTML(item.expiryDate)}</p>`
          : ""
      }
      ${
        item.url
          ? `<a href="${common.sanitizeHTML(
              item.url
            )}" target="_blank">رابط الشهادة</a>`
          : ""
      }
      ${
        isList
          ? `
        <button class="edit-btn" data-id="${item.id}">تعديل</button>
        <button class="delete-btn" data-id="${item.id}">حذف</button>
      `
          : ""
      }
    `;
    container.appendChild(div);
  }

  function renderEducation(container, item, isList) {
    const div = document.createElement("div");
    div.className = isList ? "education-list-item" : "education-item";
    div.innerHTML = `
      <h3>${common.sanitizeHTML(item.degree || "غير محدد")}</h3>
      <p>${common.sanitizeHTML(item.institution || "غير محدد")}</p>
      <p>${common.sanitizeHTML(item.field || "غير محدد")}</p>
      <p>${common.sanitizeHTML(item.startDate || "غير محدد")} - ${
      item.endDate ? common.sanitizeHTML(item.endDate) : "الآن"
    }</p>
      ${
        isList
          ? `
        <button class="edit-btn" data-id="${item.id}">تعديل</button>
        <button class="delete-btn" data-id="${item.id}">حذف</button>
      `
          : ""
      }
    `;
    container.appendChild(div);
  }

  function renderRating(container, item, isList) {
    const div = document.createElement("div");
    div.className = isList ? "rating-list-item" : "rating-item";
    div.innerHTML = `
      <h3>${common.sanitizeHTML(item.reviewerName || "مجهول")}</h3>
      <p>${common.sanitizeHTML(item.comment || "لا يوجد تعليق")}</p>
      <p>التقييم: ${common.sanitizeHTML(item.rating || "غير محدد")}/5</p>
      <p>التاريخ: ${common.sanitizeHTML(item.createdAt || "غير محدد")}</p>
      ${
        isList
          ? `
        <button class="edit-btn" data-id="${item.id}">تعديل</button>
        <button class="delete-btn" data-id="${item.id}">حذف</button>
        <button class="like-btn" data-id="${item.id}">${
              item.liked ? "إلغاء الإعجاب" : "إعجاب"
            }</button>
      `
          : ""
      }
    `;
    container.appendChild(div);
  }

  function renderAchievement(container, item, isList) {
    const div = document.createElement("div");
    div.className = isList ? "achievement-list-item" : "achievement-item";
    div.innerHTML = `
      <h3>${common.sanitizeHTML(item.title || "غير محدد")}</h3>
      <p>${common.sanitizeHTML(item.description || "لا يوجد وصف")}</p>
      <p>التاريخ: ${common.sanitizeHTML(item.achievedAt || "غير محدد")}</p>
      ${
        isList
          ? `
        <button class="edit-btn" data-id="${item.id}">تعديل</button>
        <button class="delete-btn" data-id="${item.id}">حذف</button>
      `
          : ""
      }
    `;
    container.appendChild(div);
  }

  // Show/hide popup
  function showPopup(popupId, screenId, data = {}) {
    const popupContainer = document.getElementById(popupId);
    const popupOverlay = popupContainer?.parentElement;
    if (!popupContainer || !popupOverlay) {
      console.warn(`${popupId} or overlay not found`);
      return;
    }

    popupContainer.classList.add("show");
    popupContainer.style.display = "block";
    popupContainer.removeAttribute("aria-hidden");
    popupOverlay.classList.add("show");
    popupOverlay.style.display = "block";

    const screens = popupContainer.querySelectorAll(".popup-screen");
    screens.forEach((screen) => {
      screen.style.display = screen.id === screenId ? "block" : "none";
    });

    const form = popupContainer.querySelector("form");
    if (form) {
      form.reset();
      if (data) {
        Object.keys(data).forEach((key) => {
          const input = form.querySelector(`#${key}`);
          if (input) input.value = data[key] || "";
        });
        if (data.id) form.dataset.id = data.id;
      }
      const errorSpans = form.querySelectorAll(".error");
      errorSpans.forEach((span) => (span.textContent = ""));
    }

    const inputs = form?.querySelectorAll("input, textarea");
    inputs?.forEach((input) =>
      input.addEventListener("input", () => common.checkInputDirection(input))
    );

    common.hideSignupPopup();
    common.hideLoginPopup();
    common.hideMentorApplicationPopup();
    common.hidePasswordResetPopup();
    initializeFlatpickr();
  }

  function hidePopup(popupId) {
    const popupContainer = document.getElementById(popupId);
    const popupOverlay = popupContainer?.parentElement;
    if (!popupContainer || !popupOverlay) return;

    popupContainer.classList.remove("show");
    popupContainer.style.display = "none";
    popupContainer.setAttribute("aria-hidden", "true");
    popupOverlay.classList.remove("show");
    popupOverlay.style.display = "none";

    const form = popupContainer.querySelector("form");
    if (form) {
      form.reset();
      delete form.dataset.id;
      const errorSpans = form.querySelectorAll(".error");
      errorSpans.forEach((span) => (span.textContent = ""));
    }
  }

  // Form validation
  function validateForm(form, type) {
    let isValid = true;
    const errors = form.querySelectorAll(".error");
    errors.forEach((span) => (span.textContent = ""));

    if (type === "professional") {
      const mentorName = form.querySelector("#mentor_name").value.trim();
      const gender = form.querySelector("#gender").value;
      const country = form.querySelector("#country").value;
      const aboutMe = form.querySelector("#about_me").value.trim();

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
      const linkedin = form.querySelector("#linkedin").value.trim();
      const behance = form.querySelector("#behance").value.trim();
      const github = form.querySelector("#github").value.trim();
      const instagram = form.querySelector("#instagram").value.trim();

      if (!linkedin.match(/https?:\/\/(www\.)?linkedin\.com\/.+/)) {
        form.querySelector("#linkedinError").textContent =
          "يرجى إدخال رابط LinkedIn صالح";
        isValid = false;
      }
      if (
        !behance.match(/https?:\/\/(www\.)?(behance\.net|dribbble\.com)\/.+/)
      ) {
        form.querySelector("#behanceError").textContent =
          "يرجى إدخال رابط Behance/Dribbble صالح";
        isValid = false;
      }
      if (!github.match(/https?:\/\/(www\.)?github\.com\/.+/)) {
        form.querySelector("#githubError").textContent =
          "يرجى إدخال رابط GitHub صالح";
        isValid = false;
      }
      if (!instagram.match(/https?:\/\/(www\.)?instagram\.com\/.+/)) {
        form.querySelector("#instagramError").textContent =
          "يرجى إدخال رابط Instagram صالح";
        isValid = false;
      }
    } else if (type === "experience") {
      const title = form.querySelector("#title").value.trim();
      const company = form.querySelector("#companyName").value.trim();
      const startDate = form.querySelector("#expStartDate").value;
      const description = form.querySelector("#expDescription").value.trim();

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
      const name = form.querySelector("#certificateName").value.trim();
      const issuer = form.querySelector("#issuingAuthority").value.trim();
      const issueDate = form.querySelector("#certStartDate").value;

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
      const degree = form.querySelector("#degree").value.trim();
      const institution = form.querySelector("#institution").value.trim();
      const field = form.querySelector("#field").value.trim();
      const startDate = form.querySelector("#eduStartDate").value;

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
      const reviewerName = form.querySelector("#reviewerName").value.trim();
      const comment = form.querySelector("#comment").value.trim();
      const rating = form.querySelector("#ratingScore").value;

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
      const title = form.querySelector("#achievementTitle").value.trim();
      const description = form
        .querySelector("#achievementDescription")
        .value.trim();
      const achievedAt = form.querySelector("#achievedAt").value;

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

  // Initialize profile edit popup
  function initializeProfilePopup() {
    const popup = document.getElementById("editProfileInfo");
    const closeBtn = document.getElementById("closeBtn1");
    const overlay = popup?.parentElement;

    if (closeBtn) {
      closeBtn.addEventListener("click", () => hidePopup("editProfileInfo"));
    }
    if (overlay) {
      overlay.addEventListener("click", () => hidePopup("editProfileInfo"));
    }

    const tabs = {
      BasicInfoTab: ["professionalForm", "socialForm"],
      ExperienceTab: ["editProfileEx_edit"],
      CertificatesTab: ["editProfileSp_edit"],
      EducationTab: ["editProfileEdu_edit"],
      RatingsTab: ["editProfileRating_edit"],
      AchievementsTab: ["editProfileAchievement_edit"],
    };

    Object.keys(tabs).forEach((tabId) => {
      const tab = document.getElementById(tabId);
      if (tab) {
        tab.addEventListener("click", () => {
          Object.keys(tabs).forEach((t) => {
            document.getElementById(t).classList.remove("checked");
            tabs[t].forEach((id) => {
              const el = document.getElementById(id);
              if (el) el.style.display = "none";
            });
          });
          tab.classList.add("checked");
          tabs[tabId].forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.style.display = "block";
          });
        });
      }
    });

    const professionalForm = document.getElementById("professionalForm");
    if (professionalForm) {
      professionalForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!validateForm(professionalForm, "professional")) return;

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

          const response = await fetch(
            `https://tawgeeh-v1-production.up.railway.app/users/${userId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(data),
            }
          );
          await window.auth.handleApiError(response);
          await response.json();
          common.showAlert(
            "تم",
            "تم تحديث المعلومات الأساسية بنجاح",
            "success"
          );
          hidePopup("editProfileInfo");
          loadUserProfile();
        } catch (error) {
          console.error("Profile update error:", error.message);
          common.showAlert(
            "خطأ",
            "فشل تحديث المعلومات. حاول مرة أخرى.",
            "error"
          );
        }
      });
    }

    const socialForm = document.getElementById("socialForm");
    if (socialForm) {
      socialForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!validateForm(socialForm, "social")) return;

        const data = {
          linkedin: socialForm.querySelector("#linkedin").value.trim(),
          behance: socialForm.querySelector("#behance").value.trim(),
          github: socialForm.querySelector("#github").value.trim(),
          instagram: socialForm.querySelector("#instagram").value.trim(),
        };

        try {
          const token = localStorage.getItem("authToken");
          const decodedToken = common.decodeJWT(token);
          const userId = decodedToken?.sub || decodedToken?.id;

          const response = await fetch(
            `https://tawgeeh-v1-production.up.railway.app/users/${userId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(data),
            }
          );
          await window.auth.handleApiError(response);
          await response.json();
          common.showAlert(
            "تم",
            "تم تحديث الروابط الاجتماعية بنجاح",
            "success"
          );
          hidePopup("editProfileInfo");
          loadUserProfile();
        } catch (error) {
          console.error("Social links update error:", error.message);
          common.showAlert("خطأ", "فشل تحديث الروابط. حاول مرة أخرى.", "error");
        }
      });
    }
  }

  // Initialize experience popup
  function initializeExperiencePopup() {
    const popup = document.getElementById("editProfileEx_edit2");
    const editListPopup = document.getElementById("editProfileEx_edit");
    const closeBtn = document.getElementById("closeBtn4");
    const closeListBtn = document.getElementById("closeBtn3");
    const overlay = popup?.parentElement;
    const listOverlay = editListPopup?.parentElement;

    if (closeBtn)
      closeBtn.addEventListener("click", () =>
        hidePopup("editProfileEx_edit2")
      );
    if (overlay)
      overlay.addEventListener("click", () => hidePopup("editProfileEx_edit2"));
    if (closeListBtn)
      closeListBtn.addEventListener("click", () =>
        hidePopup("editProfileEx_edit")
      );
    if (listOverlay)
      listOverlay.addEventListener("click", () =>
        hidePopup("editProfileEx_edit")
      );

    const form = document.getElementById("experienceForm");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!validateForm(form, "experience")) return;

        const currentlyWorking =
          form.querySelector("#currentlyWorking").checked;
        const data = {
          userId:
            common.decodeJWT(localStorage.getItem("authToken"))?.sub ||
            common.decodeJWT(localStorage.getItem("authToken"))?.id,
          title: form.querySelector("#title").value.trim(),
          company: form.querySelector("#companyName").value.trim(),
          startDate: form.querySelector("#expStartDate").value,
          endDate: currentlyWorking
            ? null
            : form.querySelector("#expEndDate").value || null,
          description: form.querySelector("#expDescription").value.trim(),
          id: form.dataset.id || null,
        };

        try {
          const method = data.id ? "PATCH" : "POST";
          const url = data.id
            ? `https://tawgeeh-v1-production.up.railway.app/experiences/${data.id}`
            : `https://tawgeeh-v1-production.up.railway.app/experiences`;
          const response = await fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify(data),
          });
          await window.auth.handleApiError(response);
          await response.json();
          common.showAlert("تم", "تم حفظ الخبرة بنجاح", "success");
          hidePopup("editProfileEx_edit2");
          loadSectionData(
            "experiences",
            "#experiencesContainer",
            renderExperience,
            "#experienceList"
          );
        } catch (error) {
          console.error("Experience submission error:", error.message);
          common.showAlert("خطأ", "فشل حفظ الخبرة. حاول مرة أخرى.", "error");
        }
      });
    }
  }

  // Initialize certificate popup
  function initializeCertificatePopup() {
    const popup = document.getElementById("editProfileSp_add");
    const editListPopup = document.getElementById("editProfileSp_edit");
    const closeBtn = document.getElementById("closeBtn5");
    const closeListBtn = document.getElementById("closeBtn9");
    const overlay = popup?.parentElement;
    const listOverlay = editListPopup?.parentElement;

    if (closeBtn)
      closeBtn.addEventListener("click", () => hidePopup("editProfileSp_add"));
    if (overlay)
      overlay.addEventListener("click", () => hidePopup("editProfileSp_add"));
    if (closeListBtn)
      closeListBtn.addEventListener("click", () =>
        hidePopup("editProfileSp_edit")
      );
    if (listOverlay)
      listOverlay.addEventListener("click", () =>
        hidePopup("editProfileSp_edit")
      );

    const form = document.getElementById("certificateForm");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!validateForm(form, "certificate")) return;

        const data = {
          userId:
            common.decodeJWT(localStorage.getItem("authToken"))?.sub ||
            common.decodeJWT(localStorage.getItem("authToken"))?.id,
          name: form.querySelector("#certificateName").value.trim(),
          issuer: form.querySelector("#issuingAuthority").value.trim(),
          issueDate: form.querySelector("#certStartDate").value,
          expiryDate: form.querySelector("#certEndDate").value || null,
          url: form.querySelector("#certificateLink").value.trim() || null,
          id: form.dataset.id || null,
        };

        try {
          const method = data.id ? "PATCH" : "POST";
          const url = data.id
            ? `https://tawgeeh-v1-production.up.railway.app/certifications/${data.id}`
            : `https://tawgeeh-v1-production.up.railway.app/certifications`;
          const response = await fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify(data),
          });
          await window.auth.handleApiError(response);
          await response.json();
          common.showAlert("تم", "تم حفظ الشهادة بنجاح", "success");
          hidePopup("editProfileSp_add");
          loadSectionData(
            "certifications",
            "#certificatesContainer",
            renderCertificate,
            "#certificateList"
          );
        } catch (error) {
          console.error("Certificate submission error:", error.message);
          common.showAlert("خطأ", "فشل حفظ الشهادة. حاول مرة أخرى.", "error");
        }
      });
    }
  }

  // Initialize education popup
  function initializeEducationPopup() {
    const popup = document.getElementById("editProfileEdu_add");
    const editListPopup = document.getElementById("editProfileEdu_edit");
    const closeBtn = document.getElementById("closeBtn6");
    const closeListBtn = document.getElementById("closeBtn7");
    const overlay = popup?.parentElement;
    const listOverlay = editListPopup?.parentElement;

    if (closeBtn)
      closeBtn.addEventListener("click", () => hidePopup("editProfileEdu_add"));
    if (overlay)
      overlay.addEventListener("click", () => hidePopup("editProfileEdu_add"));
    if (closeListBtn)
      closeListBtn.addEventListener("click", () =>
        hidePopup("editProfileEdu_edit")
      );
    if (listOverlay)
      listOverlay.addEventListener("click", () =>
        hidePopup("editProfileEdu_edit")
      );

    const form = document.getElementById("educationForm");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!validateForm(form, "education")) return;

        const data = {
          userId:
            common.decodeJWT(localStorage.getItem("authToken"))?.sub ||
            common.decodeJWT(localStorage.getItem("authToken"))?.id,
          degree: form.querySelector("#degree").value.trim(),
          institution: form.querySelector("#institution").value.trim(),
          field: form.querySelector("#field").value.trim(),
          startDate: form.querySelector("#eduStartDate").value,
          endDate: form.querySelector("#eduEndDate").value || null,
          id: form.dataset.id || null,
        };

        try {
          const method = data.id ? "PATCH" : "POST";
          const url = data.id
            ? `https://tawgeeh-v1-production.up.railway.app/education/${data.id}`
            : `https://tawgeeh-v1-production.up.railway.app/education`;
          const response = await fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify(data),
          });
          await window.auth.handleApiError(response);
          await response.json();
          common.showAlert("تم", "تم حفظ التعليم بنجاح", "success");
          hidePopup("editProfileEdu_add");
          loadSectionData(
            "education",
            "#educationContainer",
            renderEducation,
            "#educationList"
          );
        } catch (error) {
          console.error("Education submission error:", error.message);
          common.showAlert("خطأ", "فشل حفظ التعليم. حاول مرة أخرى.", "error");
        }
      });
    }
  }

  // Initialize rating popup
  function initializeRatingPopup() {
    const popup = document.getElementById("editProfileRating_add");
    const editListPopup = document.getElementById("editProfileRating_edit");
    const closeBtn = document.getElementById("closeBtn10");
    const closeListBtn = document.getElementById("closeBtn11");
    const overlay = popup?.parentElement;
    const listOverlay = editListPopup?.parentElement;

    if (closeBtn)
      closeBtn.addEventListener("click", () =>
        hidePopup("editProfileRating_add")
      );
    if (overlay)
      overlay.addEventListener("click", () =>
        hidePopup("editProfileRating_add")
      );
    if (closeListBtn)
      closeListBtn.addEventListener("click", () =>
        hidePopup("editProfileRating_edit")
      );
    if (listOverlay)
      listOverlay.addEventListener("click", () =>
        hidePopup("editProfileRating_edit")
      );

    const form = document.getElementById("ratingForm");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!validateForm(form, "rating")) return;

        const data = {
          userId:
            common.decodeJWT(localStorage.getItem("authToken"))?.sub ||
            common.decodeJWT(localStorage.getItem("authToken"))?.id,
          reviewerName: form.querySelector("#reviewerName").value.trim(),
          comment: form.querySelector("#comment").value.trim(),
          rating: parseInt(form.querySelector("#ratingScore").value),
          id: form.dataset.id || null,
        };

        try {
          const method = data.id ? "PATCH" : "POST";
          const url = data.id
            ? `https://tawgeeh-v1-production.up.railway.app/ratings/${data.id}`
            : `https://tawgeeh-v1-production.up.railway.app/ratings/${data.userId}`;
          const response = await fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify(data),
          });
          await window.auth.handleApiError(response);
          await response.json();
          common.showAlert("تم", "تم حفظ التقييم بنجاح", "success");
          hidePopup("editProfileRating_add");
          loadSectionData(
            "ratings",
            "#ratingContent",
            renderRating,
            "#ratingList"
          );
        } catch (error) {
          console.error("Rating submission error:", error.message);
          common.showAlert("خطأ", "فشل حفظ التقييم. حاول مرة أخرى.", "error");
        }
      });
    }
  }

  // Initialize achievement popup
  function initializeAchievementPopup() {
    const popup = document.getElementById("editProfileAchievement_add");
    const editListPopup = document.getElementById(
      "editProfileAchievement_edit"
    );
    const closeBtn = document.getElementById("closeBtn12");
    const closeListBtn = document.getElementById("closeBtn13");
    const overlay = popup?.parentElement;
    const listOverlay = editListPopup?.parentElement;

    if (closeBtn)
      closeBtn.addEventListener("click", () =>
        hidePopup("editProfileAchievement_add")
      );
    if (overlay)
      overlay.addEventListener("click", () =>
        hidePopup("editProfileAchievement_add")
      );
    if (closeListBtn)
      closeListBtn.addEventListener("click", () =>
        hidePopup("editProfileAchievement_edit")
      );
    if (listOverlay)
      listOverlay.addEventListener("click", () =>
        hidePopup("editProfileAchievement_edit")
      );

    const form = document.getElementById("achievementForm");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!validateForm(form, "achievement")) return;

        const data = {
          userId:
            common.decodeJWT(localStorage.getItem("authToken"))?.sub ||
            common.decodeJWT(localStorage.getItem("authToken"))?.id,
          title: form.querySelector("#achievementTitle").value.trim(),
          description: form
            .querySelector("#achievementDescription")
            .value.trim(),
          achievedAt: form.querySelector("#achievedAt").value,
          id: form.dataset.id || null,
        };

        try {
          const method = data.id ? "PATCH" : "POST";
          const url = data.id
            ? `https://tawgeeh-v1-production.up.railway.app/achievements/${data.id}`
            : `https://tawgeeh-v1-production.up.railway.app/achievements`;
          const response = await fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify(data),
          });
          await window.auth.handleApiError(response);
          await response.json();
          common.showAlert("تم", "تم حفظ الإنجاز بنجاح", "success");
          hidePopup("editProfileAchievement_add");
          loadSectionData(
            "achievements",
            "#achievementsContent",
            renderAchievement,
            "#achievementList"
          );
        } catch (error) {
          console.error("Achievement submission error:", error.message);
          common.showAlert("خطأ", "فشل حفظ الإنجاز. حاول مرة أخرى.", "error");
        }
      });
    }
  }

  // Delete item
  async function deleteItem(section, id, containerId, listId, renderFn) {
    try {
      const response = await fetch(
        `https://tawgeeh-v1-production.up.railway.app/${section}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      await window.auth.handleApiError(response);
      await response.json();
      common.showAlert("تم", "تم الحذف بنجاح", "success");
      loadSectionData(section, containerId, renderFn, listId);
    } catch (error) {
      console.error(`Delete ${section} error:`, error.message);
      common.showAlert("خطأ", `فشل حذف ${section}. حاول مرة أخرى.`, "error");
    }
  }

  // Like rating
  async function likeRating(id) {
    try {
      const response = await fetch(
        `https://tawgeeh-v1-production.up.railway.app/ratings/${id}/like`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      await window.auth.handleApiError(response);
      await response.json();
      common.showAlert("تم", "تم الإعجاب بالتقييم", "success");
      loadSectionData("ratings", "#ratingContent", renderRating, "#ratingList");
    } catch (error) {
      console.error("Like rating error:", error.message);
      common.showAlert("خطأ", "فشل الإعجاب بالتقييم. حاول مرة أخرى.", "error");
    }
  }

  // Initialize image upload
  function initializeImageUpload() {
    const uploadImage = document.getElementById("uploadImage");
    const profileImagePreview = document.getElementById("profileImagePreview");
    const editBtnMain = document.getElementById("editBtnMain");
    const removeProfileImage = document.getElementById("removeProfileImage");

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

          const response = await fetch(
            `https://tawgeeh-v1-production.up.railway.app/users/${userId}/upload-image`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );
          await window.auth.handleApiError(response);
          const data = await response.json();
          profileImagePreview.src = data.image_url;
          loadUserProfile();
        } catch (error) {
          console.error("Image upload error:", error.message);
          common.showAlert("خطأ", "فشل تحميل الصورة. حاول مرة أخرى.", "error");
        }
      });
    }

    if (editBtnMain) {
      editBtnMain.addEventListener("click", () => uploadImage.click());
    }

    if (removeProfileImage) {
      removeProfileImage.addEventListener("click", async () => {
        try {
          const token = localStorage.getItem("authToken");
          const decodedToken = common.decodeJWT(token);
          const userId = decodedToken?.sub || decodedToken?.id;

          const response = await fetch(
            `https://tawgeeh-v1-production.up.railway.app/users/${userId}/remove-image`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          await window.auth.handleApiError(response);
          profileImagePreview.src = "./mentor-images/personal_image.png";
          loadUserProfile();
        } catch (error) {
          console.error("Image removal error:", error.message);
          common.showAlert("خطأ", "فشل إزالة الصورة. حاول مرة أخرى.", "error");
        }
      });
    }
  }

  // Tab switching
  function switchTab(tabName) {
    const tabs = {
      overview: { content: "overviewContent", tab: "overviewTab" },
      services: { content: "servicesContent", tab: "manageservices" },
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
  }

  // Initialize event listeners
  function initializeEventListeners() {
    const editBtn = document.getElementById("editBtn");
    if (editBtn) {
      editBtn.addEventListener("click", () =>
        showPopup("editProfileInfo", "professionalForm")
      );
    }

    const addExpBtn = document.getElementById("edit_addExp");
    const editExpBtn = document.getElementById("edit_2BtnExp");
    const moreExBtn = document.getElementById("moreExBtn_EX");
    if (addExpBtn) {
      addExpBtn.addEventListener("click", () => {
        const form = document.getElementById("experienceForm");
        if (form) delete form.dataset.id;
        showPopup("editProfileEx_edit2", "experienceFormScreen");
      });
    }
    if (editExpBtn) {
      editExpBtn.addEventListener("click", () =>
        showPopup("editProfileEx_edit", "experienceList")
      );
    }
    if (moreExBtn) {
      moreExBtn.addEventListener("click", () => {
        const form = document.getElementById("experienceForm");
        if (form) delete form.dataset.id;
        showPopup("editProfileEx_edit2", "experienceFormScreen");
      });
    }

    const addCertBtn = document.getElementById("edit_addCert");
    const editCertBtn = document.getElementById("edit_2BtnCert");
    const moreCertBtn = document.getElementById("moreExBtn_SP");
    if (addCertBtn) {
      addCertBtn.addEventListener("click", () => {
        const form = document.getElementById("certificateForm");
        if (form) delete form.dataset.id;
        showPopup("editProfileSp_add", "certificateFormScreen");
      });
    }
    if (editCertBtn) {
      editCertBtn.addEventListener("click", () =>
        showPopup("editProfileSp_edit", "certificateList")
      );
    }
    if (moreCertBtn) {
      moreCertBtn.addEventListener("click", () => {
        const form = document.getElementById("certificateForm");
        if (form) delete form.dataset.id;
        showPopup("editProfileSp_add", "certificateFormScreen");
      });
    }

    const addEduBtn = document.getElementById("edit_addEdu");
    const editEduBtn = document.getElementById("edit_2BtnEdu");
    const moreEduBtn = document.getElementById("moreExBtn_Edu");
    if (addEduBtn) {
      addEduBtn.addEventListener("click", () => {
        const form = document.getElementById("educationForm");
        if (form) delete form.dataset.id;
        showPopup("editProfileEdu_add", "educationFormScreen");
      });
    }
    if (editEduBtn) {
      editEduBtn.addEventListener("click", () =>
        showPopup("editProfileEdu_edit", "educationList")
      );
    }
    if (moreEduBtn) {
      moreEduBtn.addEventListener("click", () => {
        const form = document.getElementById("educationForm");
        if (form) delete form.dataset.id;
        showPopup("editProfileEdu_add", "educationFormScreen");
      });
    }

    const addRatingBtn = document.getElementById("edit_addRating");
    const editRatingBtn = document.getElementById("edit_2BtnRating");
    const moreRatingBtn = document.getElementById("moreExBtn_Rating");
    if (addRatingBtn) {
      addRatingBtn.addEventListener("click", () => {
        const form = document.getElementById("ratingForm");
        if (form) delete form.dataset.id;
        showPopup("editProfileRating_add", "ratingFormScreen");
      });
    }
    if (editRatingBtn) {
      editRatingBtn.addEventListener("click", () =>
        showPopup("editProfileRating_edit", "ratingList")
      );
    }
    if (moreRatingBtn) {
      moreRatingBtn.addEventListener("click", () => {
        const form = document.getElementById("ratingForm");
        if (form) delete form.dataset.id;
        showPopup("editProfileRating_add", "ratingFormScreen");
      });
    }

    const addAchievementBtn = document.getElementById("edit_addAchievement");
    const editAchievementBtn = document.getElementById("edit_2BtnAchievement");
    const moreAchievementBtn = document.getElementById("moreExBtn_Achievement");
    if (addAchievementBtn) {
      addAchievementBtn.addEventListener("click", () => {
        const form = document.getElementById("achievementForm");
        if (form) delete form.dataset.id;
        showPopup("editProfileAchievement_add", "achievementFormScreen");
      });
    }
    if (editAchievementBtn) {
      editAchievementBtn.addEventListener("click", () =>
        showPopup("editProfileAchievement_edit", "achievementList")
      );
    }
    if (moreAchievementBtn) {
      moreAchievementBtn.addEventListener("click", () => {
        const form = document.getElementById("achievementForm");
        if (form) delete form.dataset.id;
        showPopup("editProfileAchievement_add", "achievementFormScreen");
      });
    }

    // Edit and delete buttons in lists
    document
      .querySelector("#experienceList")
      ?.addEventListener("click", async (e) => {
        if (e.target.classList.contains("edit-btn")) {
          const id = e.target.dataset.id;
          try {
            const response = await fetch(
              `https://tawgeeh-v1-production.up.railway.app/experiences/${id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
              }
            );
            await window.auth.handleApiError(response);
            const data = await response.json();
            const form = document.getElementById("experienceForm");
            if (form) form.dataset.id = id;
            showPopup("editProfileEx_edit2", "experienceFormScreen", data);
          } catch (error) {
            console.error("Fetch experience error:", error.message);
            common.showAlert(
              "خطأ",
              "فشل تحميل الخبرة. حاول مرة أخرى.",
              "error"
            );
          }
        } else if (e.target.classList.contains("delete-btn")) {
          deleteItem(
            "experiences",
            e.target.dataset.id,
            "#experiencesContainer",
            "#experienceList",
            renderExperience
          );
        }
      });

    document
      .querySelector("#certificateList")
      ?.addEventListener("click", async (e) => {
        if (e.target.classList.contains("edit-btn")) {
          const id = e.target.dataset.id;
          try {
            const response = await fetch(
              `https://tawgeeh-v1-production.up.railway.app/certifications/${id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
              }
            );
            await window.auth.handleApiError(response);
            const data = await response.json();
            const form = document.getElementById("certificateForm");
            if (form) form.dataset.id = id;
            showPopup("editProfileSp_add", "certificateFormScreen", data);
          } catch (error) {
            console.error("Fetch certificate error:", error.message);
            common.showAlert(
              "خطأ",
              "فشل تحميل الشهادة. حاول مرة أخرى.",
              "error"
            );
          }
        } else if (e.target.classList.contains("delete-btn")) {
          deleteItem(
            "certifications",
            e.target.dataset.id,
            "#certificatesContainer",
            "#certificateList",
            renderCertificate
          );
        }
      });

    document
      .querySelector("#educationList")
      ?.addEventListener("click", async (e) => {
        if (e.target.classList.contains("edit-btn")) {
          const id = e.target.dataset.id;
          try {
            const response = await fetch(
              `https://tawgeeh-v1-production.up.railway.app/education/${id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
              }
            );
            await window.auth.handleApiError(response);
            const data = await response.json();
            const form = document.getElementById("educationForm");
            if (form) form.dataset.id = id;
            showPopup("editProfileEdu_add", "educationFormScreen", data);
          } catch (error) {
            console.error("Fetch education error:", error.message);
            common.showAlert(
              "خطأ",
              "فشل تحميل التعليم. حاول مرة أخرى.",
              "error"
            );
          }
        } else if (e.target.classList.contains("delete-btn")) {
          deleteItem(
            "education",
            e.target.dataset.id,
            "#educationContainer",
            "#educationList",
            renderEducation
          );
        }
      });

    document
      .querySelector("#ratingList")
      ?.addEventListener("click", async (e) => {
        if (e.target.classList.contains("edit-btn")) {
          const id = e.target.dataset.id;
          try {
            const response = await fetch(
              `https://tawgeeh-v1-production.up.railway.app/ratings/${id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
              }
            );
            await window.auth.handleApiError(response);
            const data = await response.json();
            const form = document.getElementById("ratingForm");
            if (form) form.dataset.id = id;
            showPopup("editProfileRating_add", "ratingFormScreen", data);
          } catch (error) {
            console.error("Fetch rating error:", error.message);
            common.showAlert(
              "خطأ",
              "فشل تحميل التقييم. حاول مرة أخرى.",
              "error"
            );
          }
        } else if (e.target.classList.contains("delete-btn")) {
          deleteItem(
            "ratings",
            e.target.dataset.id,
            "#ratingContent",
            "#ratingList",
            renderRating
          );
        } else if (e.target.classList.contains("like-btn")) {
          likeRating(e.target.dataset.id);
        }
      });

    document
      .querySelector("#achievementList")
      ?.addEventListener("click", async (e) => {
        if (e.target.classList.contains("edit-btn")) {
          const id = e.target.dataset.id;
          try {
            const response = await fetch(
              `https://tawgeeh-v1-production.up.railway.app/achievements/${id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
              }
            );
            await window.auth.handleApiError(response);
            const data = await response.json();
            const form = document.getElementById("achievementForm");
            if (form) form.dataset.id = id;
            showPopup(
              "editProfileAchievement_add",
              "achievementFormScreen",
              data
            );
          } catch (error) {
            console.error("Fetch achievement error:", error.message);
            common.showAlert(
              "خطأ",
              "فشل تحميل الإنجاز. حاول مرة أخرى.",
              "error"
            );
          }
        } else if (e.target.classList.contains("delete-btn")) {
          deleteItem(
            "achievements",
            e.target.dataset.id,
            "#achievementsContent",
            "#achievementList",
            renderAchievement
          );
        }
      });

    // Tab navigation
    document
      .getElementById("overviewTab")
      ?.addEventListener("click", () => switchTab("overview"));
    document
      .getElementById("manageservices")
      ?.addEventListener("click", () => switchTab("services"));
    document
      .getElementById("ratingTab")
      ?.addEventListener("click", () => switchTab("rating"));
    document
      .getElementById("achievementsTab")
      ?.addEventListener("click", () => switchTab("achievements"));

    // Service card dropdowns
    const gearIcons = document.querySelectorAll(".gear-icon");
    gearIcons.forEach((icon) => {
      icon.addEventListener("click", function (e) {
        e.stopPropagation();
        const dropdown = this.parentElement.querySelector(".edit-actions");
        if (dropdown) {
          document.querySelectorAll(".edit-actions").forEach((d) => {
            if (d !== dropdown) d.style.display = "none";
          });
          dropdown.style.display =
            dropdown.style.display === "block" ? "none" : "block";
        }
      });
    });

    document.addEventListener("click", () => {
      document.querySelectorAll(".edit-actions").forEach((dropdown) => {
        dropdown.style.display = "none";
      });
    });
  }

  // Load initial data
  await loadUserProfile();
  await loadSectionData(
    "experiences",
    "#experiencesContainer",
    renderExperience,
    "#experienceList"
  );
  await loadSectionData(
    "certifications",
    "#certificatesContainer",
    renderCertificate,
    "#certificateList"
  );
  await loadSectionData(
    "education",
    "#educationContainer",
    renderEducation,
    "#educationList"
  );
  await loadSectionData(
    "ratings",
    "#ratingContent",
    renderRating,
    "#ratingList"
  );
  await loadSectionData(
    "achievements",
    "#achievementsContent",
    renderAchievement,
    "#achievementList"
  );

  // Initialize components
  initializeFlatpickr();
  initializeProfilePopup();
  initializeExperiencePopup();
  initializeCertificatePopup();
  initializeEducationPopup();
  initializeRatingPopup();
  initializeAchievementPopup();
  initializeImageUpload();
  initializeEventListeners();
});
