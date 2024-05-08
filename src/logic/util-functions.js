// add event listeners for project list item clicks
function projectItemFilterListeners(todoList) {
  const projectListContainer = document.querySelector("#project-list-section");

  projectListContainer.addEventListener("click", (event) => {
    const projectItem = event.target.closest(".project-list-item");
    if (projectItem) {
      const projectTitle = projectItem.querySelector(
        ".project-item-title"
      ).textContent;

      // get selected date
      const selectedDate = document.querySelector("#date-picker").value;

      if (!selectedDate) {
        // no date -> filter only on project
        todoList.filterTodoItems({ type: "project", value: projectTitle });
      } else {
        // else -> filter by both project and date
        todoList.filterTodoItems({
          type: "project-date",
          project: projectTitle,
          date: selectedDate,
        });
      }
    }
  });
}

// toggle menu and modal (only for clicking outside of the form / menu)
function toggleMenuAndModal() {
  const menuContainer = document.querySelector(".menu-container");
  const burgerMenuButton = document.querySelector(".burger-menu-button");
  const addTodoButton = document.querySelector(".add-todo-button");
  const buttonContainer = document.querySelector(".button-container");
  const modalCover = document.querySelector(".modal");
  const formElement = document.querySelector("form");

  let clickedInsideForm = false;
  if (formElement && formElement.contains(event.target)) {
    clickedInsideForm = true;
  }

  if (window.innerWidth < 768) {
    if (
      !menuContainer.contains(event.target) &&
      !burgerMenuButton.contains(event.target) &&
      !clickedInsideForm
    ) {
      hideMenuAndModal(
        menuContainer,
        burgerMenuButton,
        addTodoButton,
        buttonContainer,
        modalCover
      );
    }
  } else {
    if (
      (!menuContainer.contains(event.target) ||
        !burgerMenuButton.contains(event.target)) &&
      !clickedInsideForm
    ) {
      hideMenuAndModal(
        menuContainer,
        burgerMenuButton,
        addTodoButton,
        buttonContainer,
        modalCover
      );
    }
  }
}

function hideMenuAndModal(
  menuContainer,
  burgerMenuButton,
  addTodoButton,
  buttonContainer,
  modalCover
) {
  menuContainer.classList.remove("show-menu");
  burgerMenuButton.classList.remove("hidden");
  addTodoButton.classList.remove("hidden");
  buttonContainer.classList.remove("hidden");
  if (modalCover) {
    modalCover.remove();
  }
}

// event listener for toggling menu and modal
document.addEventListener("click", toggleMenuAndModal);

function updateProjectCount(projects) {
  const projectItems = document.querySelectorAll(".project-item-title");
  let totalCount = 0;

  // update individual project counts and calculate total count
  projectItems.forEach((item) => {
    const projectTitle = item.textContent;
    const projectToUpdate = projects.find(
      (project) => project.title === projectTitle
    );

    const numTodosElement = item.parentElement.querySelector(
      ".project-item-num-todos"
    );
    const projectCount = projectToUpdate.todoItems.length;
    numTodosElement.textContent = projectCount;
    if (projectTitle !== "General") {
      totalCount += projectCount;
    }
  });

  // update count for the "General" project
  const generalProjectItem = document.querySelector(".project-item-title");
  if (generalProjectItem && generalProjectItem.textContent === "General") {
    const generalNumTodosElement =
      generalProjectItem.parentElement.querySelector(".project-item-num-todos");
    if (generalNumTodosElement) {
      const generalProjectCount = totalCount;
      generalNumTodosElement.textContent = generalProjectCount;
    }
  }
}

export { projectItemFilterListeners, toggleMenuAndModal, updateProjectCount };
