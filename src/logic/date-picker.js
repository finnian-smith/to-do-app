import { format } from "date-fns";

function initialiseDatePicker() {
  const dateDropdownButton = document.getElementById("date-dropdown");
  const datePickerInput = document.getElementById("date-picker");

  // add event listener to button
  dateDropdownButton.addEventListener("click", () => {
    datePickerInput.style.display = "block";
  });

  // add event listener to date picker input field
  datePickerInput.addEventListener("change", () => {
    const formattedDate = format(new Date(datePickerInput.value), "dd/MM/yyyy");
    dateDropdownButton.textContent = formattedDate;
    datePickerInput.style.display = "none";
  });
}

export { initialiseDatePicker };
