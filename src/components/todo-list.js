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

  // function to create date headers
  createDateHeaders() {
    const dates = this.getUniqueDates();

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

  // function to append each todo item to the correct date
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

  // function to create each todo item
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
    todoItemRight.appendChild(todoTag);

    todoElement.appendChild(todoItemRight);

    return todoElement;
  }

  // function that filters todo items by project / tag

  // function that sets priority colour
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
}

export default TodoList;
