import { format, isToday } from "date-fns";

function updateTodaysDate() {
  const headerDate = document.querySelector(".header-date");

  const currentDate = new Date();

  const formattedDate = isToday(currentDate)
    ? `Today, ${format(currentDate, "EEE dd MMMM yyyy")}`
    : format(currentDate, "EEE dd MMMM yyyy");

  headerDate.textContent = formattedDate;
}

function initialiseDatePicker() {
  const dateDropdownButton = document.getElementById("date-dropdown");
  const datePickerInput = document.getElementById("date-picker");

  dateDropdownButton.addEventListener("click", () => {
    datePickerInput.style.display = "block";
  });

  datePickerInput.addEventListener("change", () => {
    const formattedDate = format(new Date(datePickerInput.value), "dd/MM/yyyy");
    dateDropdownButton.textContent = formattedDate;
    datePickerInput.style.display = "none";
  });
}

export { updateTodaysDate, initialiseDatePicker };
