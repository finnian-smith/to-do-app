// testing project list
function renderProjectList(projects, container) {
  const projectListElement = document.createElement("div");
  projectListElement.classList.add("project-list");
  container.appendChild(projectListElement);

  projects.forEach((project) => {
    const projectItem = document.createElement("p"); // button?
    projectItem.classList.add("project-list-item");
    projectItem.textContent = `${project.title}`;
    projectListElement.appendChild(projectItem);
  });
}

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

export { renderProjectList, renderProject }; // add in "addEventHandlers" here
