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

export function renderItem(container, item, isList, isProfileOwner) {
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
        isList && isProfileOwner
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

export async function loadSectionData(
  cache,
  containerId,
  renderFn,
  listId,
  isProfileOwner
) {
  const container = document.querySelector(containerId);
  const listContainer = document.querySelector(listId);
  if (!container || !listContainer) return;

  try {
    const token = localStorage.getItem("authToken");
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
    if (!userId) throw new Error("User ID not found in URL");

    if (cache.certifications !== null) {
      const items = cache.certifications;
      container.innerHTML = "";
      listContainer.innerHTML = "";
      if (items.length === 0) {
        container.innerHTML = `<p class="no-data">لا توجد نتائج لعرضها</p>`;
        listContainer.innerHTML = `<p class="no-data">لا توجد نتائج لعرضها</p>`;
        return;
      }
      items.forEach((item, index) => {
        renderFn(container, item, false, isProfileOwner);
        renderFn(listContainer, item, true, isProfileOwner);
        if (index >= 3 && containerId === "#certificatesContainer") {
          const hiddenContainer =
            document.getElementById("hiddenCertificates") ||
            document.createElement("div");
          hiddenContainer.id = "hiddenCertificates";
          hiddenContainer.style.display = "none";
          container.appendChild(hiddenContainer);
          hiddenContainer.appendChild(container.lastChild);
        }
      });

      if (containerId === "#certificatesContainer") {
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
      return;
    }

    const response = await fetch(`${API_BASE_URL}/certifications/${userId}`, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });
    await window.auth.handleApiError(response);
    const data = await response.json();
    const items = data.certifications || [];

    cache.certifications = items;
    container.innerHTML = "";
    listContainer.innerHTML = "";
    if (items.length === 0) {
      container.innerHTML = `<p class="no-data">لا توجد نتائج لعرضها</p>`;
      listContainer.innerHTML = `<p class="no-data">لا توجد نتائج لعرضها</p>`;
      return;
    }

    items.forEach((item, index) => {
      renderFn(container, item, false, isProfileOwner);
      renderFn(listContainer, item, true, isProfileOwner);
      if (index >= 3 && containerId === "#certificatesContainer") {
        const hiddenContainer =
          document.getElementById("hiddenCertificates") ||
          document.createElement("div");
        hiddenContainer.id = "hiddenCertificates";
        hiddenContainer.style.display = "none";
        container.appendChild(hiddenContainer);
        hiddenContainer.appendChild(container.lastChild);
      }
    });

    if (containerId === "#certificatesContainer") {
      const moreBtn = document.getElementById("moreBtnCert");
      if (moreBtn && items.length > 3) {
        moreBtn.style.display = "block";
        const btnText = moreBtn.querySelector(".btn-text");
        btnText.textContent = `عرض المزيد +${items.length - 3}`;
        let isExpanded = false;
        moreBtn.onclick = () => {
          isExpanded = !isExpanded;
          const hiddenContainer = document.getElementById("hiddenCertificates");
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
    console.error("Failed to load certifications:", error.message);
    container.innerHTML = `<p class="no-data">لا توجد نتائج لعرضها</p>`;
    listContainer.innerHTML = `<p class="no-data">لا توجد نتائج لعرضها</p>`;
  }
}

function validateForm(form) {
  let isValid = true;
  form.querySelectorAll(".error").forEach((span) => (span.textContent = ""));

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

  if (!isValid) {
    const firstError = form.querySelector(".error:not(:empty)");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      firstError.parentElement.querySelector("input,textarea")?.focus();
    }
  }

  return isValid;
}

export function initializePopup(showPopup, hidePopup, cache, isProfileOwner) {
  if (!isProfileOwner) return; // Skip popup initialization for non-owners

  const popup = document.getElementById("editProfileSp_add");
  const editListPopup = document.getElementById("editProfileSp_edit");
  const closeBtn = document.getElementById("closeBtn5");
  const closeListBtn = document.getElementById("closeBtn9");
  const overlay = popup?.parentElement;
  const listOverlay = editListPopup?.parentElement;

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

  const form = document.getElementById("certificateForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!isProfileOwner) {
        common.showAlert(
          "غير مسموح",
          "لا يمكنك تعديل هذا الملف الشخصي",
          "error"
        );
        return;
      }
      if (!validateForm(form)) return;

      const data = {
        name: form.querySelector("#certificateName").value.trim(),
        issuingAuthority: form.querySelector("#issuingAuthority").value.trim(),
        issueDate: form.querySelector("#certStartDate").value,
        expiryDate: form.querySelector("#certEndDate").value || null,
        certificateLink:
          form.querySelector("#certificateLink").value.trim() || null,
        image_url:
          "https://i.pinimg.com/736x/18/c6/e0/18c6e05ccc51b8e8e8385d0b38105d83.jpg",
      };

      try {
        const token = localStorage.getItem("authToken");
        const method = form.dataset.id ? "PATCH" : "POST";
        const url = form.dataset.id
          ? `${API_BASE_URL}/certifications/${form.dataset.id}`
          : `${API_BASE_URL}/certifications`;

        const response = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        await window.auth.handleApiError(response);

        common.showAlert("تم", "تم حفظ الشهادة بنجاح", "success");
        cache.certifications = null;
        hidePopup("editProfileSp_add");
        await loadSectionData(
          cache,
          "#certificatesContainer",
          renderItem,
          "#certificateList",
          isProfileOwner
        );
      } catch (error) {
        console.error("Certificate form submission error:", error.message);
        common.showAlert("خطأ", "فشل حفظ الشهادة", "error");
      }
    });
  }
}

export function initializeEventListeners(cache, showPopup, isProfileOwner) {
  if (!isProfileOwner) return; // Skip event listeners for non-owners

  document
    .querySelector("#certificateList")
    ?.addEventListener("click", async (e) => {
      if (e.target.classList.contains("edit-cert")) {
        const id = e.target.dataset.id;
        try {
          const token = localStorage.getItem("authToken");
          const response = await fetch(`${API_BASE_URL}/certifications/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          await window.auth.handleApiError(response);
          const data = await response.json();

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
          common.showAlert("خطأ", "فشل جلب بيانات الشهادة", "error");
        }
      } else if (e.target.classList.contains("delete-cert")) {
        if (confirm("هل أنت متأكد من حذف هذه الشهادة؟")) {
          try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(
              `${API_BASE_URL}/certifications/${e.target.dataset.id}`,
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
            cache.certifications = null;
            await loadSectionData(
              cache,
              "#certificatesContainer",
              renderItem,
              "#certificateList",
              isProfileOwner
            );
          } catch (error) {
            console.error("Delete certificate error:", error.message);
            common.showAlert("خطأ", "فشل حذف الشهادة", "error");
          }
        }
      }
    });
}
