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

function updateProject(project, updatedProject) {
  if (!project || !updatedProject) {
    throw new Error("Invalid project or updated project.");
  }

  Object.assign(project, updatedProject);

  for (const todo of project.todoItems) {
    todo.tag = updatedProject.title;
  }
}

function deleteProject(projects, project, todos) {
  if (!projects || !project || !todos) {
    throw new Error("Invalid projects, project, or todos.");
  }

  deleteTodoFromProject(project, todos);

  project.todoItems = [];

  const index = projects.indexOf(project);
  if (index !== -1) {
    projects.splice(index, 1);
  }
}

function deleteTodoFromProject(project, todos) {
  project.todoItems.forEach((todo) => {
    const index = todos.indexOf(todo);
    if (index !== -1) {
      todos.splice(index, 1);
    }
  });
}

export {
  createTodo,
  createProject,
  addTodoToProject,
  updateProject,
  deleteProject,
};
