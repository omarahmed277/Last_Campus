document.addEventListener("DOMContentLoaded", async () => {
  const calendarHeader = document.getElementById("calendar-header");
  const calendarBody = document.getElementById("calendar-body");
  const currentWeekSpan = document.getElementById("current-week");
  const prevWeekBtn = document.getElementById("prev-week");
  const nextWeekBtn = document.getElementById("next-week");
  const saveBtn = document.getElementById("save-btn");
  const titleInput = document.getElementById("title-input");
  const recurrenceSelect = document.getElementById("recurrence");
  const maxDaysBeforeInput = document.getElementById("max-days-before");
  const minHoursBeforeInput = document.getElementById("min-hours-before");
  const availableNowRadio = document.getElementById("available-now");
  const dateRangeRadio = document.getElementById("date-range");
  const changeDatesBtn = document.getElementById("change-dates-btn");

  // Set current date to today (May 20, 2025, 12:55 PM EEST)
  let currentDate = new Date("2025-05-20T12:55:00+03:00");
  let availabilityData = {
    title: titleInput.value || "Work time",
    availableFrom: "2025-05-20",
    expireAt: "2026-05-20",
    maxDaysBefore: parseInt(maxDaysBeforeInput.value) || 30,
    minHoursBefore: parseInt(minHoursBeforeInput.value) || 24,
    maxBookingsPerDay: 5,
    breakMinutes: 15,
    isRecurring: recurrenceSelect.value !== "none",
    days: [
      {
        dayOfWeek: "MONDAY",
        intervals: [{ startTime: "13:00", endTime: "14:00" }],
      },
    ],
  };

  const dayMap = {
    SATURDAY: "السبت",
    SUNDAY: "الأحد",
    MONDAY: "الإثنين",
    TUESDAY: "الثلاثاء",
    WEDNESDAY: "الأربعاء",
    THURSDAY: "الخميس",
    FRIDAY: "الجمعة",
  };

  // Function to convert API format to local format
  function convertToLocalFormat(apiData) {
    const localAvailability = {};
    apiData.days.forEach((day) => {
      const localDayName = dayMap[day.dayOfWeek];
      localAvailability[localDayName] = day.intervals.map((interval) => ({
        start: interval.startTime,
        end: interval.endTime,
      }));
    });
    return localAvailability;
  }

  // Function to convert local format to API format
  function convertToApiFormat(localAvailability) {
    const days = Object.entries(localAvailability).map(
      ([dayName, intervals]) => {
        const apiDayName = Object.keys(dayMap).find(
          (key) => dayMap[key] === dayName
        );
        return {
          dayOfWeek: apiDayName,
          intervals: intervals.map((interval) => ({
            startTime: interval.start,
            endTime: interval.end,
          })),
        };
      }
    );
    return {
      title: titleInput.value || "Work time",
      availableFrom: availableNowRadio.checked
        ? new Date().toISOString().split("T")[0]
        : availabilityData.availableFrom,
      expireAt: availableNowRadio.checked
        ? new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            .toISOString()
            .split("T")[0]
        : availabilityData.expireAt,
      maxDaysBefore: parseInt(maxDaysBeforeInput.value) || 30,
      minHoursBefore: parseInt(minHoursBeforeInput.value) || 24,
      maxBookingsPerDay: 5,
      breakMinutes: 15,
      isRecurring: recurrenceSelect.value !== "none",
      days,
    };
  }

  // Function to collect availability from UI
  function collectAvailabilityFromUI() {
    const localAvailability = {};
    document.querySelectorAll(".availability-row").forEach((row) => {
      const dayName = row.dataset.day;
      const timeSlots = row.querySelectorAll(".time-slot");
      const slots = [];
      timeSlots.forEach((slot) => {
        const start = slot.querySelector(".slot-start").value;
        const end = slot.querySelector(".slot-end").value;
        if (start && end) {
          slots.push({ start, end });
        }
      });
      if (slots.length > 0) {
        localAvailability[dayName] = slots;
      }
    });
    return localAvailability;
  }

  // Function to render the calendar
  function renderCalendar(localAvailability) {
    calendarHeader.innerHTML = "";
    calendarBody.innerHTML = "";

    // Adjust the date to the start of the week (Saturday)
    let startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() - 1);

    // Header: Time label and days
    const timeLabel = document.createElement("div");
    timeLabel.className = "time-label";
    timeLabel.textContent = "GMT-5";
    calendarHeader.appendChild(timeLabel);

    const days = [
      "الأحد",
      "الإثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + i);
      const dayLabel = document.createElement("div");
      dayLabel.className = "day-label";
      dayLabel.innerHTML = `
        <div class="day-name">${days[i]}</div>
        <div class="day-date">${dayDate.getDate()}</div>
      `;
      calendarHeader.appendChild(dayLabel);
    }

    // Body: Time slots
    for (let hour = 0; hour < 24; hour++) {
      const timeCell = document.createElement("div");
      timeCell.className = "time-cell";
      timeCell.textContent = `${hour.toString().padStart(2, "0")}:00`;
      calendarBody.appendChild(timeCell);

      for (let day = 0; day < 7; day++) {
        const calendarCell = document.createElement("div");
        calendarCell.className = "calendar-cell";
        const dayName = days[day];
        if (localAvailability[dayName]) {
          localAvailability[dayName].forEach((slot) => {
            const startHour = parseInt(slot.start.split(":")[0]);
            const startMin = parseInt(slot.start.split(":")[1]);
            const endHour = parseInt(slot.end.split(":")[0]);
            const endMin = parseInt(slot.end.split(":")[1]);
            const startTime = startHour + startMin / 60;
            const endTime = endHour + endMin / 60;

            if (startTime <= hour && hour < endTime) {
              const timeSlotBlock = document.createElement("div");
              timeSlotBlock.className = "time-slot-block";
              timeSlotBlock.textContent = `${slot.start} - ${slot.end}`;
              calendarCell.appendChild(timeSlotBlock);
            }
          });
        }
        calendarBody.appendChild(calendarCell);
      }
    }
  }

  // Function to update the current week display
  function updateCurrentWeek() {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() - 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    currentWeekSpan.textContent = `من ${startOfWeek.toLocaleDateString(
      "ar-EG"
    )} إلى ${endOfWeek.toLocaleDateString("ar-EG")}`;
  }

  // Function to check if two time slots overlap
  function isOverlapping(slot1, slot2) {
    const start1 = new Date(`1970-01-01T${slot1.start}:00`);
    const end1 = new Date(`1970-01-01T${slot1.end}:00`);
    const start2 = new Date(`1970-01-01T${slot2.start}:00`);
    const end2 = new Date(`1970-01-01T${slot2.end}:00`);
    return start1 < end2 && start2 < end1;
  }

  // Function to validate a time slot
  function isValidSlot(slot) {
    const start = new Date(`1970-01-01T${slot.start}:00`);
    const end = new Date(`1970-01-01T${slot.end}:00`);
    return end > start;
  }

  // Function to sort time slots
  function sortSlots(slots) {
    return slots.sort((a, b) => {
      const timeA = new Date(`1970-01-01T${a.start}:00`);
      const timeB = new Date(`1970-01-01T${b.start}:00`);
      return timeA - timeB;
    });
  }

  // Function to generate a unique time slot
  function getUniqueTimeSlot(dayName, localAvailability) {
    const existingSlots = localAvailability[dayName] || [];
    const possibleStarts = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ];

    for (let start of possibleStarts) {
      const startHour = parseInt(start.split(":")[0]);
      const durations = [1, 1.5, 2];
      for (let duration of durations) {
        const endHour = Math.floor(startHour + duration);
        const endMin = (duration % 1) * 60;
        const end = `${endHour.toString().padStart(2, "0")}:${endMin
          .toString()
          .padStart(2, "0")}`;
        const newSlot = { start, end };
        if (endHour <= 18 && isValidSlot(newSlot)) {
          const hasConflict = existingSlots.some((slot) =>
            isOverlapping(slot, newSlot)
          );
          if (!hasConflict) {
            return newSlot;
          }
        }
      }
    }

    if (existingSlots.length > 0) {
      const lastSlot = existingSlots[existingSlots.length - 1];
      const lastEndHour = parseInt(lastSlot.end.split(":")[0]);
      const lastEndMin = parseInt(lastSlot.end.split(":")[1]);
      const lastEndTime = lastEndHour + lastEndMin / 60;
      if (lastEndTime < 18) {
        const startHour = Math.floor(lastEndTime);
        const startMin = (lastEndTime % 1) * 60;
        const start = `${startHour.toString().padStart(2, "0")}:${startMin
          .toString()
          .padStart(2, "0")}`;
        const endHour = Math.floor(lastEndTime + 1);
        const end = `${endHour.toString().padStart(2, "0")}:00`;
        const newSlot = { start, end };
        if (
          isValidSlot(newSlot) &&
          !existingSlots.some((slot) => isOverlapping(slot, newSlot))
        ) {
          return newSlot;
        }
      }
    }

    return { start: "08:00", end: "09:00" };
  }

  // Function to update availability status
  function updateAvailabilityStatus(dayRow, dayName, localAvailability) {
    const status = dayRow.querySelector(".availability-status");
    status.textContent =
      localAvailability[dayName] && localAvailability[dayName].length
        ? "متاح"
        : "غير متاح";
  }

  // Save button handler
  saveBtn.addEventListener("click", async () => {
    const localAvailability = collectAvailabilityFromUI();
    const apiData = convertToApiFormat(localAvailability);
    try {
      await apiService.createMentorAvailability(apiData);
      showNotification("تم حفظ التغييرات بنجاح");
      availabilityData = apiData; // Update local data
    } catch (error) {
      showNotification(`خطأ أثناء الحفظ: ${error.message}`);
    }
  });

  // Mock date picker for "Change Dates" button
  changeDatesBtn.addEventListener("click", () => {
    // Simulate date picker (replace with actual date picker logic)
    const newStart = prompt("أدخل تاريخ البدء (YYYY-MM-DD):", "2025-05-20");
    const newEnd = prompt("أدخل تاريخ الانتهاء (YYYY-MM-DD):", "2026-05-20");
    if (newStart && newEnd) {
      availabilityData.availableFrom = newStart;
      availabilityData.expireAt = newEnd;
      dateRangeRadio.checked = true;
    }
  });

  // Event listeners for week navigation
  prevWeekBtn.addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() - 7);
    renderCalendar(convertToLocalFormat(availabilityData));
    updateCurrentWeek();
  });

  nextWeekBtn.addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() + 7);
    renderCalendar(convertToLocalFormat(availabilityData));
    updateCurrentWeek();
  });

  // Event listeners for adding and managing availability
  document.querySelectorAll(".availability-row").forEach((row) => {
    const dayName = row.dataset.day;
    const timeSlotsDiv = row.querySelector(".time-slots");

    // Handle adding new time slot
    row.querySelector(".add-btn").addEventListener("click", () => {
      const localAvailability = convertToLocalFormat(availabilityData);
      const newSlot = getUniqueTimeSlot(dayName, localAvailability);
      if (!localAvailability[dayName]) {
        localAvailability[dayName] = [];
      }
      localAvailability[dayName].push(newSlot);
      localAvailability[dayName] = sortSlots(localAvailability[dayName]);
      availabilityData = convertToApiFormat(localAvailability);

      // Rebuild time slots
      timeSlotsDiv.innerHTML = "";
      localAvailability[dayName].forEach((slot, slotIndex) => {
        const timeSlotElement = document.createElement("div");
        timeSlotElement.className = "time-slot";
        timeSlotElement.innerHTML = `
          <input type="time" class="slot-start" value="${slot.start}" />
          <span>-</span>
          <input type="time" class="slot-end" value="${slot.end}" />
          <button class="remove-slot-btn">×</button>
        `;
        timeSlotsDiv.appendChild(timeSlotElement);

        // Attach event listeners for the new slot
        attachSlotEventListeners(timeSlotElement, dayName, slotIndex);
      });

      updateAvailabilityStatus(row, dayName, localAvailability);
      renderCalendar(localAvailability);
    });

    // Function to attach event listeners to time slot inputs and remove button
    function attachSlotEventListeners(slotElement, dayName, index) {
      const startInput = slotElement.querySelector(".slot-start");
      const endInput = slotElement.querySelector(".slot-end");
      const removeBtn = slotElement.querySelector(".remove-slot-btn");

      startInput.addEventListener("change", () => {
        const localAvailability = convertToLocalFormat(availabilityData);
        const newStart = startInput.value;
        const currentEnd = localAvailability[dayName][index].end;
        const updatedSlot = { start: newStart, end: currentEnd };

        if (!isValidSlot(updatedSlot)) {
          alert("وقت الانتهاء يجب أن يكون بعد وقت البدء");
          startInput.value = localAvailability[dayName][index].start;
          return;
        }

        const hasOverlap = localAvailability[dayName].some(
          (slot, i) => i !== index && isOverlapping(slot, updatedSlot)
        );
        if (hasOverlap) {
          alert("الفترة الزمنية تتداخل مع فترة أخرى");
          startInput.value = localAvailability[dayName][index].start;
          return;
        }

        localAvailability[dayName][index].start = newStart;
        localAvailability[dayName] = sortSlots(localAvailability[dayName]);
        availabilityData = convertToApiFormat(localAvailability);
        rebuildTimeSlots();
        renderCalendar(localAvailability);
      });

      endInput.addEventListener("change", () => {
        const localAvailability = convertToLocalFormat(availabilityData);
        const newEnd = endInput.value;
        const currentStart = localAvailability[dayName][index].start;
        const updatedSlot = { start: currentStart, end: newEnd };

        if (!isValidSlot(updatedSlot)) {
          alert("وقت الانتهاء يجب أن يكون بعد وقت البدء");
          endInput.value = localAvailability[dayName][index].end;
          return;
        }

        const hasOverlap = localAvailability[dayName].some(
          (slot, i) => i !== index && isOverlapping(slot, updatedSlot)
        );
        if (hasOverlap) {
          alert("الفترة الزمنية تتداخل مع فترة أخرى");
          endInput.value = localAvailability[dayName][index].end;
          return;
        }

        localAvailability[dayName][index].end = newEnd;
        localAvailability[dayName] = sortSlots(localAvailability[dayName]);
        availabilityData = convertToApiFormat(localAvailability);
        rebuildTimeSlots();
        renderCalendar(localAvailability);
      });

      removeBtn.addEventListener("click", () => {
        const localAvailability = convertToLocalFormat(availabilityData);
        localAvailability[dayName].splice(index, 1);
        if (localAvailability[dayName].length === 0) {
          delete localAvailability[dayName];
        }
        availabilityData = convertToApiFormat(localAvailability);
        rebuildTimeSlots();
        updateAvailabilityStatus(row, dayName, localAvailability);
        renderCalendar(localAvailability);
      });
    }

    // Function to rebuild time slots for the day
    function rebuildTimeSlots() {
      const localAvailability = convertToLocalFormat(availabilityData);
      timeSlotsDiv.innerHTML = "";
      if (localAvailability[dayName]) {
        localAvailability[dayName] = sortSlots(localAvailability[dayName]);
        localAvailability[dayName].forEach((slot, slotIndex) => {
          const timeSlotElement = document.createElement("div");
          timeSlotElement.className = "time-slot";
          timeSlotElement.innerHTML = `
            <input type="time" class="slot-start" value="${slot.start}" />
            <span>-</span>
            <input type="time" class="slot-end" value="${slot.end}" />
            <button class="remove-slot-btn">×</button>
          `;
          timeSlotsDiv.appendChild(timeSlotElement);
          attachSlotEventListeners(timeSlotElement, dayName, slotIndex);
        });
      }
    }

    // Initialize existing slots
    const localAvailability = convertToLocalFormat(availabilityData);
    if (localAvailability[dayName]) {
      rebuildTimeSlots();
      updateAvailabilityStatus(row, dayName, localAvailability);
    }
  });

  // Initial render
  renderCalendar(convertToLocalFormat(availabilityData));
  updateCurrentWeek();
});
