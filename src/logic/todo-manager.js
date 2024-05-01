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

function updateTodo(todo, updatedTodo, projects) {
  if (!todo || !updatedTodo) {
    throw new Error("Invalid todo or updated todo.");
  }

  const index = projects.findIndex((project) => project.title === todo.tag);
  if (index !== -1) {
    const project = projects[index];
    const todoIndex = project.todoItems.findIndex(
      (item) => item.title === todo.title
    );
    if (todoIndex !== -1) {
      project.todoItems.splice(todoIndex, 1);
    }
  }

  Object.assign(todo, updatedTodo);

  const projectIndex = projects.findIndex(
    (project) => project.title === updatedTodo.tag
  );
  if (projectIndex !== -1) {
    const project = projects[projectIndex];
    project.addTodo(todo);
  }
}

function deleteTodoItem(todo, todos, projects) {
  const todoIndex = todos.findIndex((existingTodo) => existingTodo === todo);

  // if todo exists, remove it from the main todos array
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
  }

  // find the project to which the todo item belongs
  const projectToUpdate = projects.find(
    (project) => project.title === todo.tag
  );

  if (projectToUpdate) {
    // remove the todo item from the project's todoItems array
    const projectTodoIndex = projectToUpdate.todoItems.findIndex(
      (item) => item === todo
    );
    if (projectTodoIndex !== -1) {
      projectToUpdate.todoItems.splice(projectTodoIndex, 1);
    }
  }
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
  updateTodo,
  deleteTodoItem,
  updateProject,
  deleteProject,
};
