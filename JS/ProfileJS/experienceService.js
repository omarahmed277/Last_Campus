const API_BASE_URL = "https://tawgeeh-v1-production.up.railway.app";

export async function loadSectionData(dataCache, containerSelector, renderItem, listSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  try {
    const token = localStorage.getItem("authToken");
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");

    const response = await fetch(`${API_BASE_URL}/experiences?userId=${userId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const { success, data } = await response.json();
    if (!success) throw new Error("Invalid API response");

    dataCache.experiences = data || [];
    container.innerHTML = "";
    data.forEach((item) => renderItem(item, container));

    const list = document.querySelector(listSelector);
    if (list) {
      list.innerHTML = "";
      data.forEach((item) => renderItem(item, list));
    }
  } catch (error) {
    console.error("Failed to load experiences:", error.message);
    common.showAlert("خطأ", "فشل تحميل الخبرات", "error");
  }
}

export function renderItem(item, container) {
  const div = document.createElement("div");
  div.className = "experience-item";
  div.innerHTML = `
    <h3>${item.title || "غير محدد"}</h3>
    <p>${item.company || "غير محدد"} | ${item.startDate || "غير محدد"} - ${
    item.currentlyWorking ? "الآن" : item.endDate || "غير محدد"
  }</p>
    <p>${item.description || "لا توجد تفاصيل"}</p>
    <button class="edit-exp" data-id="${item.id}" style="display: none;">تعديل</button>
    <button class="delete-exp" data-id="${item.id}" style="display: none;">حذف</button>
  `;
  container.appendChild(div);
}

export function initializePopup(showPopup, hidePopup, dataCache) {
  const popup = document.getElementById("editProfileEx_edit2");
  const closeBtn = document.getElementById("closeBtn4");
  const overlay = popup?.parentElement;

  if (closeBtn)
    closeBtn.addEventListener("click", () => hidePopup("editProfileEx_edit2"));
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) hidePopup("editProfileEx_edit2");
    });
  }

  const form = document.getElementById("experienceForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        title: form.querySelector("#expTitle").value.trim(),
        company: form.querySelector("#expCompany").value.trim(),
        startDate: form.querySelector("#expStartDate").value,
        endDate: form.querySelector("#expEndDate").value,
        currentlyWorking: form.querySelector("#currentlyWorking").checked,
        description: form.querySelector("#expDescription").value.trim(),
      };

      if (!data.title || !data.company || !data.startDate) {
        common.showAlert("خطأ", "يرجى ملء جميع الحقول الإلزامية", "error");
        return;
      }

      try {
        const token = localStorage.getItem("authToken");
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get("id");
        const method = form.dataset.id ? "PATCH" : "POST";
        const url = form.dataset.id
          ? `${API_BASE_URL}/experiences/${form.dataset.id}`
          : `${API_BASE_URL}/experiences`;

        const response = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, userId }),
        });
        await window.auth.handleApiError(response);

        common.showAlert("تم", `تم ${form.dataset.id ? "تحديث" : "إضافة"} الخبرة بنجاح`, "success");
        hidePopup("editProfileEx_edit2");
        await loadSectionData(dataCache, "#experiencesContainer", renderItem, "#experienceList");
      } catch (error) {
        console.error("Experience form submission error:", error.message);
        common.showAlert("خطأ", "فشل حفظ الخبرة", "error");
      }
    });
  }
}

export function initializeEventListeners(dataCache, showPopup) {
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("edit-exp")) {
      const id = e.target.dataset.id;
      const experience = dataCache.experiences.find((exp) => exp.id == id);
      if (experience) {
        showPopup("editProfileEx_edit2", "experienceFormScreen", {
          expTitle: experience.title,
          expCompany: experience.company,
          expStartDate: experience.startDate,
          expEndDate: experience.endDate,
          currentlyWorking: experience.currentlyWorking,
          expDescription: experience.description,
          id: experience.id,
        });
      }
    } else if (e.target.classList.contains("delete-exp")) {
      const id = e.target.dataset.id;
      if (confirm("هل أنت متأكد من حذف هذه الخبرة؟")) {
        try {
          const token = localStorage.getItem("authToken");
          const response = await fetch(`${API_BASE_URL}/experiences/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          await window.auth.handleApiError(response);

          common.showAlert("تم", "تم حذف الخبرة بنجاح", "success");
          await loadSectionData(dataCache, "#experiencesContainer", renderItem, "#experienceList");
        } catch (error) {
          console.error("Experience deletion error:", error.message);
          common.showAlert("خطأ", "فشل حذف الخبرة", "error");
        }
      }
    }
  });
}