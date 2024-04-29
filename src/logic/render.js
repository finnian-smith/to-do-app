import ProjectList from "../components/project-list.js";
import TodoList from "../components/todo-list.js";
import ButtonContainer from "../components/button-container.js";
import { projectItemFilterListeners } from "./event-handlers.js";

// render project list
function renderProjectList(projects, todos) {
  const projectListContainer = document.querySelector("#project-list-section");
  const projectList = new ProjectList(projects, todos, projectListContainer);
  projectList.render();
}

// render todo list
function renderTodoList(projects, todos) {
  const todoListContainer = document.querySelector("#todo-list-section");
  const todoList = new TodoList(todos, projects, todoListContainer);
  todoList.render();
  projectItemFilterListeners(todoList);
}

// render button container
function renderButtonContainer() {
  const buttonContainerSection = document.querySelector(
    "#button-container-section"
  );
  const buttonContainer = new ButtonContainer(buttonContainerSection);
  buttonContainer.render();
}

export { renderProjectList, renderTodoList, renderButtonContainer };
