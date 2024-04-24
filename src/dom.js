import {
  createTodo,
  createProject,
  addTodoToProject,
  deleteTodoFromProject,
  deleteProject,
} from "../src/logic/todo-manager.js";
import { renderProjectList, renderTodoList } from "./logic/render.js";
import { toggleMenuAndModal } from "./logic/event-handlers.js";

// projects
const project1 = createProject("General", "#000000");
const project2 = createProject("Shopping", "#ff0000");
const project3 = createProject("Personal", "#0000FF");

const projects = [project1, project2, project3];

// todos
const todo1 = createTodo("Buy milk", "2024-03-25", "Low", "Shopping");
const todo2 = createTodo("Gym", "2024-03-25", "Medium", "Personal");
const todo3 = createTodo("Buy protein", "2024-03-26", "High", "Shopping");
const todo4 = createTodo("Gym", "2024-03-27", "Medium", "Personal");
const todo5 = createTodo("Buy pants", "2024-03-29", "Low", "Shopping");
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

// call rendering functions
renderProjectList(projects, todos);
renderTodoList(projects, todos);

// event listener for toggling menu and modal
document.addEventListener("click", toggleMenuAndModal);

export { projects, todos };
