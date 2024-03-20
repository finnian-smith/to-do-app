import "../src/styles/main.css";
import {
  createTodo,
  createProject,
  addTodoToProject,
  deleteTodoFromProject,
  deleteProject,
} from "../src/logic/todo-manager.js";
import { renderProject } from "./dom.js";

const project1 = createProject("Shopping List");
const project2 = createProject("Personal List");

// const projects = [project1, project2];

const todo1 = createTodo("Buy milk", "2024-03-25", "High", "Shopping");
const todo2 = createTodo("Gym", "2024-03-25", "Medium", "Personal");
const todo3 = createTodo("Gym", "2024-03-27", "Medium", "Personal");

addTodoToProject(project1, todo1);
addTodoToProject(project2, todo2);

console.log(project1);
console.log(project2);

// const projectList = document.querySelector("#project-list-section");
// renderProjectList(projects, projectList);

const todoContent = document.querySelector("#todo-content");
// renderProject(project1, todoContent);
// renderProject(project2, todoContent);
