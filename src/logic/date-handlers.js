import { format, isToday } from "date-fns";

function updateTodaysDate() {
  const headerDate = document.querySelector(".header-date");

  const currentDate = new Date();

  const formattedDate = isToday(currentDate)
    ? `Today, ${format(currentDate, "EEE dd MMMM yyyy")}`
    : format(currentDate, "EEE dd MMMM yyyy");

  headerDate.textContent = formattedDate;
}

function initialiseDatePicker(todoList) {
  const dateDropdownButton = document.querySelector("#date-dropdown");
  const datePickerInput = document.querySelector("#date-picker");
  const defaultHomeValue = "Home";

  dateDropdownButton.addEventListener("click", () => {
    if (datePickerInput.style.display === "block") {
      datePickerInput.style.display = "none";
      datePickerInput.value = "";
      todoList.filterTodoItems({ type: "project", value: "General" });
    } else {
      datePickerInput.style.display = "block";
    }
    dateDropdownButton.textContent = defaultHomeValue;
  });

  datePickerInput.addEventListener("change", () => {
    const selectedDate = datePickerInput.value;
    const formattedDate = format(new Date(selectedDate), "dd/MM/yyyy");
    console.log(selectedDate);
    dateDropdownButton.textContent = formattedDate;
    datePickerInput.style.display = "none";

    todoList.filterTodoItems({ type: "date", value: selectedDate });
  });
}

export { updateTodaysDate, initialiseDatePicker };
