const API_BASE_URL = "https://tawgeeh-v1-production.up.railway.app";

function sanitizeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str || "";
  return div.innerHTML;
}

function formatDate(dateString) {
  if (!dateString) return "غير محدد";
  const date = new Date(dateString);
  return date.toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function renderItem(container, item, isList) {
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

export async function loadSectionData(cache, containerId, renderFn, listId) {
  const container = document.querySelector(containerId);
  const listContainer = document.querySelector(listId);
  if (!container || !listContainer) return;

  try {
    const token = localStorage.getItem("authToken");
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
    if (!userId) throw new Error("User ID not found in URL");

    if (cache.education !== null) {
      const items = cache.education;
      container.innerHTML = "";
      listContainer.innerHTML = "";
      if (items.length === 0) {
        container.innerHTML = `<p class="no-data">لا توجد نتائج لعرضها</p>`;
        listContainer.innerHTML = `<p class="no-data">لا توجد نتائج لعرضها</p>`;
        return;
      }
      items.forEach((item) => {
        renderFn(container, item, false);
        renderFn(listContainer, item, true);
      });
      return;
    }

    const response = await fetch(`${API_BASE_URL}/education/${userId}`, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });
    await window.auth.handleApiError(response);
    const data = await response.json();
    const items = data.education || [];

    cache.education = items;
    container.innerHTML = "";
    listContainer.innerHTML = "";
    if (items.length === 0) {
      container.innerHTML = `<p class="no-data">لا توجد نتائج لعرضها</p>`;
      listContainer.innerHTML = `<p class="no-data">لا توجد نتائج لعرضها</p>`;
      return;
    }

    items.forEach((item) => {
      renderFn(container, item, false);
      renderFn(listContainer, item, true);
    });
  } catch (error) {
    console.error("Failed to load education:", error.message);
    container.innerHTML = `<p class="no-data">لا توجد نتائج لعرضها</p>`;
    listContainer.innerHTML = `<p class="no-data">لا توجد نتائج لعرضها</p>`;
  }
}

function validateForm(form) {
  let isValid = true;
  form.querySelectorAll(".error").forEach((span) => (span.textContent = ""));

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
    form.querySelector("#institutionError").textContent = "يرجى إدخال المؤسسة";
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

  if (!isValid) {
    const firstError = form.querySelector(".error:not(:empty)");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      firstError.parentElement.querySelector("input,textarea")?.focus();
    }
  }

  return isValid;
}

export function initializePopup(showPopup, hidePopup, cache) {
  const popup = document.getElementById("editProfileEdu_add");
  const editListPopup = document.getElementById("editProfileEdu_edit");
  const closeBtn = document.getElementById("closeBtn6");
  const closeListBtn = document.getElementById("closeBtn7");
  const overlay = popup?.parentElement;
  const listOverlay = editListPopup?.parentElement;

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

  const form = document.getElementById("educationForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!validateForm(form)) return;

      const data = {
        degree: form.querySelector("#degree").value.trim(),
        institution: form.querySelector("#institution").value.trim(),
        field: form.querySelector("#field").value.trim(),
        startDate: form.querySelector("#eduStartDate").value,
        endDate: form.querySelector("#eduEndDate").value || null,
      };

      try {
        const token = localStorage.getItem("authToken");
        const method = form.dataset.id ? "PATCH" : "POST";
        const url = form.dataset.id
          ? `${API_BASE_URL}/education/${form.dataset.id}`
          : `${API_BASE_URL}/education`;

        const response = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        await window.auth.handleApiError(response);

        common.showAlert("تم", "تم حفظ التعليم بنجاح", "success");
        cache.education = null;
        hidePopup("editProfileEdu_add");
        await loadSectionData(
          cache,
          "#educationContainer",
          renderItem,
          "#educationList"
        );
      } catch (error) {
        console.error("Education form submission error:", error.message);
      }
    });
  }
}

export function initializeEventListeners(cache, showPopup) {
  document
    .querySelector("#educationList")
    ?.addEventListener("click", async (e) => {
      if (e.target.classList.contains("edit-edu")) {
        const id = e.target.dataset.id;
        try {
          const token = localStorage.getItem("authToken");
          const response = await fetch(`${API_BASE_URL}/education/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          await window.auth.handleApiError(response);
          const data = await response.json();

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
          try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(
              `${API_BASE_URL}/education/${e.target.dataset.id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            await window.auth.handleApiError(response);

            common.showAlert("تم", "تم الحذف بنجاح", "success");
            cache.education = null;
            await loadSectionData(
              cache,
              "#educationContainer",
              renderItem,
              "#educationList"
            );
          } catch (error) {
            console.error("Delete education error:", error.message);
          }
        }
      }
    });
}
