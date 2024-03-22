import ProjectList from "./components/project-list.js";

// project list
const projects = [
  {
    title: "General",
    todoItems: [
      ["Buy milk", "2024-03-25", "High", "Shopping"],
      ["Gym", "2024-03-25", "Medium", "Personal"],
      ["Gym", "2024-03-27", "Medium", "Personal"],
    ],
  },
  {
    title: "Shopping",
    todoItems: [["Buy milk", "2024-03-25", "High", "Shopping"]],
  },
  {
    title: "Personal",
    todoItems: [
      ["Gym", "2024-03-25", "Medium", "Personal"],
      ["Gym", "2024-03-27", "Medium", "Personal"],
    ],
  },
];

const container = document.querySelector("#project-list-section");
const projectList = new ProjectList(projects, container);
projectList.render();

// original
function renderProject(project, container) {
  const projectElement = document.createElement("div");
  projectElement.classList.add("project-title");
  projectElement.textContent = `${project.title}`;
  container.appendChild(projectElement);

  project.todoItems.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    projectElement.appendChild(todoElement);
  });
}

function createTodoElement(todo) {
  const todoElement = document.createElement("div");
  todoElement.classList.add("todo");
  todoElement.innerHTML = `
      <h3>${todo.title}</h3>
      <p>Due Date: ${todo.dueDate}</p>
      <p>Priority: ${todo.priority}</p>
      <p>Tag: ${todo.tag}</p>
    `;
  return todoElement;
}

// maybe below is a good approach
function addEventHandlers(app) {
  app.addEventListener("click", function (event) {
    const target = event.target;

    // Check if the clicked element is a delete button for a todo item
    if (target.classList.contains("delete-todo")) {
      const todoElement = target.closest(".todo");
      const todoId = todoElement.dataset.todoId; // Assuming each todo item has a unique ID
      // Find and delete the corresponding todo item from the project
      // Delete the todo item from the DOM
    }

    // Check if the clicked element is a delete button for a project
    if (target.classList.contains("delete-project")) {
      // Find and delete the corresponding project
      // Delete the project from the DOM
    }
  });
}

document.addEventListener("click", function (event) {
  const menuContainer = document.querySelector(".menu-container");
  const burgerMenuButton = document.querySelector(".burger-menu-button");
  const modalCover = document.querySelector(".modal");

  if (
    !menuContainer.contains(event.target) &&
    !burgerMenuButton.contains(event.target)
  ) {
    menuContainer.classList.remove("show-menu");
    burgerMenuButton.classList.remove("hidden");
    if (modalCover) {
      modalCover.remove();
    }
  }
});

export { renderProject }; // add in "addEventHandlers" here
