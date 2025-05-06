// Appointment Management System
document.addEventListener("DOMContentLoaded", () => {
  // Settings elements
  const availabilityRows = document.querySelectorAll(".availability-row");
  const recurrenceSelect = document.querySelector("select");
  const maxAdvanceInput = document.querySelector('.input-number[value="3"]');
  const minLeadTimeInput = document.querySelector('.input-number[value="4"]');
  const durationIntervalInput = document.querySelector(
    '.input-number[value="30"]'
  );
  const maxDailyBookingsInput = document.querySelector(
    '.input-number[value="4"]'
  );
  const calendarBody = document.querySelector(".calendar-body");

  // Store availability settings
  let availability = {
    Sunday: { available: false, hours: [] },
    Monday: { available: false, hours: [] },
    Tuesday: { available: false, hours: [] },
    Wednesday: { available: false, hours: [] },
    Thursday: { available: false, hours: [] },
    Friday: { available: false, hours: [] },
    Saturday: { available: false, hours: [] },
  };

  // Map day names from Arabic to English for internal use
  const dayNameMap = {
    الأحد: "Sunday",
    الإثنين: "Monday",
    الثلاثاء: "Tuesday",
    الأربعاء: "Wednesday",
    الخميس: "Thursday",
    الجمعة: "Friday",
    السبت: "Saturday",
  };

  // Initialize availability settings
  availabilityRows.forEach((row) => {
    const dayLabel = row.querySelector(".day-name-label").textContent;
    const status = row.querySelector(".availability-status");
    const englishDay = dayNameMap[dayLabel];

    row.addEventListener("click", () => {
      const isAvailable = status.textContent === "غير متاح";
      status.textContent = isAvailable ? "متاح" : "غير متاح";
      availability[englishDay].available = isAvailable;

      if (isAvailable) {
        // Prompt for available hours (e.g., 09:00-17:00)
        const hours = prompt(
          "Enter available hours (e.g., 09:00-17:00)",
          "09:00-17:00"
        );
        if (hours && hours.match(/^\d{2}:\d{2}-\d{2}:\d{2}$/)) {
          availability[englishDay].hours = hours.split("-");
        } else {
          availability[englishDay].available = false;
          status.textContent = "غير متاح";
          alert("Invalid hours format. Use HH:MM-HH:MM");
        }
      } else {
        availability[englishDay].hours = [];
      }
    });
  });

  // Appointment preparation
  function prepareAppointment(day, time, duration) {
    const appointment = {
      day,
      time,
      duration,
      date: getDateForDay(day),
      active: true,
    };
    return validateAppointment(appointment) ? appointment : null;
  }

  // Get date for a given day (based on calendar header)
  function getDateForDay(day) {
    const dayLabels = document.querySelectorAll(".day-label");
    for (let label of dayLabels) {
      if (label.querySelector(".day-name").textContent === day) {
        return label.querySelector(".day-date").textContent;
      }
    }
    return null;
  }

  // Appointment validation
  function validateAppointment(appointment) {
    const { day, time, duration, date } = appointment;
    const englishDay = dayNameMap[day];

    // 1. Check if day is available
    if (!availability[englishDay].available) {
      console.error(`Day ${day} is not available`);
      return false;
    }

    // 2. Check if time is within available hours
    const [startHour, endHour] = availability[englishDay].hours;
    if (startHour && endHour) {
      if (time < startHour || time >= endHour) {
        console.error(
          `Time ${time} is outside available hours (${startHour}-${endHour})`
        );
        return false;
      }
    }

    // 3. Check maximum advance booking
    const maxAdvanceDays = parseInt(maxAdvanceInput.value);
    const appointmentDate = new Date(parseArabicDate(date));
    const currentDate = new Date();
    const maxAdvanceDate = new Date(currentDate);
    maxAdvanceDate.setDate(currentDate.getDate() + maxAdvanceDays);
    if (appointmentDate > maxAdvanceDate) {
      console.error(
        `Appointment date ${date} exceeds maximum advance booking period`
      );
      return false;
    }

    // 4. Check minimum lead time
    const minLeadHours = parseInt(minLeadTimeInput.value);
    const appointmentTime = new Date(appointmentDate);
    const [hours, minutes] = time.split(":").map(Number);
    appointmentTime.setHours(hours, minutes);
    const minLeadTime = new Date(currentDate);
    minLeadTime.setHours(currentDate.getHours() + minLeadHours);
    if (appointmentTime < minLeadTime) {
      console.error(
        `Appointment time ${time} is too soon (minimum lead time: ${minLeadHours} hours)`
      );
      return false;
    }

    // 5. Check duration interval
    const durationInterval = parseInt(durationIntervalInput.value);
    if (duration % durationInterval !== 0) {
      console.error(
        `Duration ${duration} does not match interval ${durationInterval}`
      );
      return false;
    }

    // 6. Check maximum daily bookings
    const maxDailyBookings = parseInt(maxDailyBookingsInput.value);
    const dailyAppointments = getAppointmentsForDay(day, date);
    if (dailyAppointments.length >= maxDailyBookings) {
      console.error(
        `Maximum daily bookings (${maxDailyBookings}) reached for ${day}`
      );
      return false;
    }

    // 7. Check for overlapping appointments
    if (hasOverlap(day, date, time, duration)) {
      console.error(
        `Appointment at ${time} on ${day} overlaps with another appointment`
      );
      return false;
    }

    return true;
  }

  // Parse Arabic date (e.g., "1 مايو" to JavaScript Date)
  function parseArabicDate(dateStr) {
    const [day, month] = dateStr.split(" ");
    const monthMap = {
      يناير: 0,
      فبراير: 1,
      مارس: 2,
      أبريل: 3,
      مايو: 4,
      يونيو: 5,
      يوليو: 6,
      أغسطس: 7,
      سبتمبر: 8,
      أكتوبر: 9,
      نوفمبر: 10,
      ديسمبر: 11,
    };
    return new Date(2025, monthMap[month], parseInt(day));
  }

  // Get existing appointments for a specific day
  function getAppointmentsForDay(day, date) {
    const appointments = [];
    const dayIndex = Array.from(
      document.querySelectorAll(".day-label")
    ).findIndex(
      (label) => label.querySelector(".day-name").textContent === day
    );
    if (dayIndex === -1) return appointments;

    const cells = document.querySelectorAll(
      `.calendar-body .calendar-cell:nth-child(${8 * (dayIndex + 1)})`
    );
    cells.forEach((cell) => {
      const appointment = cell.querySelector(".appointment");
      if (appointment) {
        const time = appointment.querySelector(".appointment-time").textContent;
        const duration = parseInt(
          appointment
            .querySelector(".appointment-duration")
            .textContent.match(/\d+/)[0]
        );
        appointments.push({ time, duration });
      }
    });
    return appointments;
  }

  // Check for overlapping appointments
  function hasOverlap(day, date, time, duration) {
    const appointments = getAppointmentsForDay(day, date);
    const [newHours, newMinutes] = time.split(":").map(Number);
    const newStart = newHours * 60 + newMinutes;
    const newEnd = newStart + duration;

    for (let appt of appointments) {
      const [hours, minutes] = appt.time.split(":").map(Number);
      const start = hours * 60 + minutes;
      const end = start + appt.duration;
      if (newStart < end && newEnd > start) {
        return true;
      }
    }
    return false;
  }

  // Add appointment to calendar
  function addAppointmentToCalendar(appointment) {
    const { day, time, duration } = appointment;
    const dayIndex = Array.from(
      document.querySelectorAll(".day-label")
    ).findIndex(
      (label) => label.querySelector(".day-name").textContent === day
    );
    const timeIndex = Array.from(
      document.querySelectorAll(".time-cell")
    ).findIndex((cell) => cell.textContent === time);

    if (dayIndex === -1 || timeIndex === -1) {
      console.error("Invalid day or time");
      return;
    }

    const cell = calendarBody.children[timeIndex * 8 + (dayIndex + 1)];
    const appointmentDiv = document.createElement("div");
    appointmentDiv.className = "appointment";
    appointmentDiv.innerHTML = `
            <div class="appointment-time">${time}</div>
            <div class="appointment-duration">(${duration} دقيقة)</div>
        `;
    cell.appendChild(appointmentDiv);
  }

  // Example: Add a new appointment (for testing)
  calendarBody.addEventListener("click", (e) => {
    const cell = e.target.closest(".calendar-cell");
    if (!cell || cell.querySelector(".appointment")) return;

    const timeCell = cell.previousElementSibling;
    while (timeCell && !timeCell.classList.contains("time-cell")) {
      timeCell = timeCell.previousElementSibling;
    }
    const time = timeCell ? timeCell.textContent : null;

    const dayIndex =
      (Array.from(cell.parentNode.children).indexOf(cell) % 8) - 1;
    const day = document
      .querySelectorAll(".day-label")
      [dayIndex]?.querySelector(".day-name").textContent;

    if (time && day) {
      const duration = parseInt(durationIntervalInput.value);
      const appointment = prepareAppointment(day, time, duration);
      if (appointment) {
        addAppointmentToCalendar(appointment);
        alert("Appointment added successfully");
      } else {
        alert("Invalid appointment");
      }
    }
  });
});
