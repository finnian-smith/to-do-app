import ProjectList from "./components/project-list.js";
import TodoList from "./components/todo-list.js";
import Todo from "./models/todo.js";
import Project from "./models/project.js";
import {
  createTodo,
  createProject,
  addTodoToProject,
  deleteTodoFromProject,
  deleteProject,
} from "../src/logic/todo-manager.js";

// projects
const project1 = createProject("General");
const project2 = createProject("Shopping");
const project3 = createProject("Personal");

const projects = [project1, project2, project3];

// todos
const todo1 = createTodo("Buy milk", "2024-03-25", "High", "Shopping");
const todo2 = createTodo("Gym", "2024-03-25", "Medium", "Personal");
const todo3 = createTodo("Buy protein", "2024-03-26", "High", "Shopping");
const todo4 = createTodo("Gym", "2024-03-27", "Medium", "Personal");
const todo5 = createTodo("Buy pants", "2024-03-29", "Medium", "Shopping");
const todo6 = createTodo("Gym", "2024-04-01", "Medium", "Personal");

const todos = [todo1, todo2, todo3, todo4, todo5, todo6];

// dynamically add todos to projects
projects.forEach((project) => {
  todos.forEach((todo) => {
    if (project.title == "General" || project.title == todo.tag) {
      addTodoToProject(project, todo);
    }
  });
});

// renders project list
function renderProjectList() {
  const projectListContainer = document.querySelector("#project-list-section");
  const projectList = new ProjectList(projects, projectListContainer);
  projectList.render();
}

// renders todo list
function renderTodoList() {
  const todoListContainer = document.querySelector("#todo-list-section");
  const todoList = new TodoList(todos, todoListContainer);
  todoList.render();
}

// for testing and can be removed
console.log(project1);
console.log(project2);
console.log(project3);

// remove modal
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

export { renderProjectList, renderTodoList }; // add in "addEventHandlers" here
