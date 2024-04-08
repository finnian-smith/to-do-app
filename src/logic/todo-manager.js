import Todo from "../models/todo.js";
import Project from "../models/project.js";

function createTodo(title, dueDate, priority, tag) {
  return new Todo(title, dueDate, priority, tag);
}

function createProject(name, color) {
  return new Project(name, color);
}

function addTodoToProject(project, todo) {
  if (!project || !todo) {
    throw new Error("Invalid project or todo.");
  }
  project.addTodo(todo);
}

function deleteTodoFromProject(project, todo) {
  if (!project || !todo) {
    throw new Error("Invalid project or todo.");
  }
  const index = project.todoItems.indexOf(todo);
  if (index !== -1) {
    project.todoItems.splice(index, 1);
  }
}

function deleteProject(projects, project) {
  if (!projects || !project) {
    throw new Error("Invalid projects or project.");
  }
  const index = projects.indexOf(project);
  if (index !== -1) {
    projects.splice(index, 1);
  }
}

export {
  createTodo,
  createProject,
  addTodoToProject,
  deleteTodoFromProject,
  deleteProject,
};
