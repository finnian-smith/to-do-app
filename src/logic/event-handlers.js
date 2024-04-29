// add event listeners for project list item clicks
function projectItemFilterListeners(todoList) {
  const projectListContainer = document.querySelector("#project-list-section");

  projectListContainer.addEventListener("click", (event) => {
    const projectItem = event.target.closest(".project-list-item");
    if (projectItem) {
      const projectTitle = projectItem.querySelector(
        ".project-item-title"
      ).textContent;
      todoList.filterTodoItems(projectTitle);
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

export { projectItemFilterListeners, toggleMenuAndModal };
