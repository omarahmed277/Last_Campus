document.addEventListener("DOMContentLoaded", function () {
  // Dropdown arrow toggles
  document.querySelectorAll(".select-icon").forEach((icon) => {
    icon.addEventListener("click", function () {
      this.classList.toggle("rotate");
      const select = this.previousElementSibling;
      select.focus();
    });
  });

  // Select focus/blur handlers
  document.querySelectorAll("select").forEach((select) => {
    const icon = select.nextElementSibling;

    select.addEventListener("focus", function () {
      icon.classList.add("rotate");
    });

    select.addEventListener("blur", function () {
      icon.classList.remove("rotate");
    });
  });

  // Auto-advance code inputs
  document.querySelectorAll(".code-input").forEach((input, index, inputs) => {
    input.addEventListener("input", function () {
      if (this.value.length === this.maxLength) {
        const nextInput = inputs[index + 1];
        if (nextInput) nextInput.focus();
      }
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && this.value.length === 0) {
        const prevInput = inputs[index - 1];
        if (prevInput) prevInput.focus();
      }
    });
  });
});