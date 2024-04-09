import "../styles/todo-list.css";
import Todo from "../models/todo.js";
import { format, isToday, isTomorrow } from "date-fns";

class TodoList {
  constructor(todos, container) {
    this.todos = todos;
    this.container = container;
  }

  render() {
    this.container.textContent = "";

    this.createDateHeaders();
    this.appendTodoByDate();
  }

  // create date headers
  createDateHeaders() {
    const dates = this.getUniqueDates();
    this.createDateHeadersFromDates(dates);
  }

  // create date headers from an array of dates
  createDateHeadersFromDates(dates) {
    dates.forEach((date) => {
      const displayDate = this.getDisplayDate(date);
      const dateElement = this.createDateElement(displayDate);
      dateElement.setAttribute("date", date);
      this.container.appendChild(dateElement);
    });
  }

  // create unique date headers
  getUniqueDates() {
    let dates = new Set();

    this.todos.forEach((todo) => {
      dates.add(todo.dueDate);
    });

    return dates;
  }

  // get display date for date headers
  getDisplayDate(dueDate) {
    const dayOfWeek = format(dueDate, "EEEE");
    const formattedDate = format(dueDate, "dd MMM");
    return isToday(dueDate)
      ? `Today | ${dayOfWeek}`
      : isTomorrow(dueDate)
      ? `Tomorrow | ${dayOfWeek}`
      : `${formattedDate} | ${dayOfWeek}`;
  }

  // create data element for dom tree
  createDateElement(displayDate) {
    const dateElement = document.createElement("div");
    dateElement.classList.add("date-header");

    const dateText = document.createElement("p");
    dateText.classList.add("date-header-text");
    dateText.textContent = displayDate;

    dateElement.appendChild(dateText);

    return dateElement;
  }

  // append todo item to the correct date
  appendTodoByDate() {
    this.todos.forEach((todo) => {
      const todoDate = todo.dueDate;
      const dateHeader = this.container.querySelector(`[date="${todoDate}"]`);
      if (dateHeader) {
        const todoElement = this.createTodoElement(todo);
        dateHeader.appendChild(todoElement);
      }
    });
  }

  // create todo item
  createTodoElement(todo) {
    const todoElement = document.createElement("div");
    todoElement.classList.add("todo-item");

    const todoItemLeft = document.createElement("div");
    todoItemLeft.classList.add("todo-item-left");
    const todoItemRight = document.createElement("div");
    todoItemRight.classList.add("todo-item-right");

    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.classList.add("todo-checkbox");
    todoCheckbox.checked = todo.completed;
    todoCheckbox.addEventListener("change", () => {
      todo.completed = todoCheckbox.checked;
      if (todo.completed) {
        todo.markAsComplete();
      } else {
        todo.markAsIncomplete();
      }
    });

    todoItemLeft.appendChild(todoCheckbox);

    const todoTitle = document.createElement("p");
    todoTitle.classList.add("todo-title");
    todoTitle.textContent = todo.title;
    todoItemLeft.appendChild(todoTitle);

    todoElement.appendChild(todoItemLeft);

    const todoPriority = document.createElement("p");
    todoPriority.classList.add("todo-priority");
    todoPriority.textContent = todo.priority;
    this.setPriorityClass(todo, todoPriority);
    todoItemRight.appendChild(todoPriority);

    const todoTag = document.createElement("p");
    todoTag.classList.add("todo-tag");
    todoTag.textContent = todo.tag;
    this.setTagColor(todo.tag, todoTag);
    todoItemRight.appendChild(todoTag);

    todoElement.appendChild(todoItemRight);

    return todoElement;
  }

  // filter todo items by project / tag
  filterTodoItems(project = "General") {
    this.container.textContent = "";

    const filteredTodos = this.todos.filter((todo) => {
      return project === "General" || project === todo.tag;
    });

    const uniqueDates = new Set(filteredTodos.map((todo) => todo.dueDate));
    this.createDateHeadersFromDates(uniqueDates);

    filteredTodos.forEach((todo) => {
      const todoElement = this.createTodoElement(todo);
      const dateHeader = this.container.querySelector(
        `[date="${todo.dueDate}"]`
      );
      if (dateHeader) {
        dateHeader.appendChild(todoElement);
      }
    });
  }

  // set priority colour
  setPriorityClass(todo, todoPriority) {
    switch (todo.priority) {
      case "Low":
        todoPriority.classList.add("priority-low");
        break;
      case "Medium":
        todoPriority.classList.add("priority-medium");
        break;
      case "High":
        todoPriority.classList.add("priority-high");
        break;
      default:
        break;
    }
  }

  // need to add todo as argument
  setTagColor(todoTag, todoTagElement) {
    const projects = document.querySelectorAll(".project-list-item");

    let tagColor = null;

    projects.forEach((project) => {
      const titleElement = project.querySelector(".project-item-title");
      const colorElement = project.querySelector(".project-item-color");
      const title = titleElement.textContent;

      if (title === todoTag) {
        const computedStyle = window.getComputedStyle(colorElement);
        tagColor = computedStyle.getPropertyValue("border-color");
        todoTagElement.style.borderColor = tagColor;
      }
    });
  }
}

export default TodoList;
