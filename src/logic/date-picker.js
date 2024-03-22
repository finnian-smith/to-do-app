// Get the date picker element
function initialiseDatePicker() {
  // Get references to the button and the date picker input field
  const dateDropdownButton = document.getElementById("date-dropdown");
  const datePickerInput = document.getElementById("date-picker");

  // Add an event listener to the button
  dateDropdownButton.addEventListener("click", () => {
    // Show the date picker input when the button is clicked
    datePickerInput.style.display = "block";
  });

  // Add an event listener to the date picker input field
  datePickerInput.addEventListener("change", () => {
    // Update the button text with the selected date
    dateDropdownButton.textContent = datePickerInput.value;
    // Hide the date picker input after selecting a date
    datePickerInput.style.display = "none";
  });
}

export { initialiseDatePicker };
