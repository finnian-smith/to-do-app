import {
  createTodo,
  createProject,
  addTodoToProject,
} from "../src/logic/todo-manager.js";
import {
  renderHeaderContainer,
  renderProjectList,
  renderTodoList,
  renderButtonContainer,
} from "./logic/render.js";
import TodoList from "./components/todo-list.js";
import {
  updateTodaysDate,
  updateMessageByTime,
  initialiseDatePicker,
} from "./logic/date-handlers.js";

// projects
const project1 = createProject("General", "#000000");
const project2 = createProject("Personal", "#F4C430");
const project3 = createProject("Training", "#0000ff");
const project4 = createProject("Work", "#ff0000");

const projects = [project1, project2, project3, project4];

// todos
const todo1 = createTodo("Call mom", "2024-04-30", "High", "Personal");
const todo2 = createTodo("Gym session", "2024-04-30", "Low", "Training");
const todo3 = createTodo("Rubber duck debug", "2024-05-01", "Medium", "Work");
const todo4 = createTodo("Read book", "2024-05-03", "Low", "Personal");
const todo5 = createTodo("Running session", "2024-05-04", "Medium", "Training");
const todo6 = createTodo("Finish project", "2024-05-09", "High", "Work");
const todo7 = createTodo("Gym session", "2024-05-10", "Medium", "Training");

const todos = [todo1, todo2, todo3, todo4, todo5, todo6, todo7];

// dynamically add todos to projects
projects.forEach((project) => {
  todos.forEach((todo) => {
    if (project.title == "General" || project.title == todo.tag) {
      addTodoToProject(project, todo);
    }
  });
});

const todoListContainer = document.querySelector("#todo-list-section");
const todoList = new TodoList(todos, projects, todoListContainer);

// call rendering functions
renderHeaderContainer();
renderProjectList(projects, todos);
renderTodoList(projects, todos);
renderButtonContainer();

// call time functions
initialiseDatePicker(todoList);
updateTodaysDate();
updateMessageByTime();

export { projects, todos };
