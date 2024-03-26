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
      dateElement.classList.add("date-header");
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
    dateElement.textContent = displayDate;
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

    const todoCheckbox = document.createElement("div");
    todoCheckbox.classList.add("todo-checkbox");
    todoCheckbox.textContent = todo.completed;
    todoElement.appendChild(todoCheckbox);
    // figure out logic for displaying checkbox here

    const todoTitle = document.createElement("p");
    todoTitle.classList.add("todo-title");
    todoTitle.textContent = todo.title;
    todoElement.appendChild(todoTitle);

    const todoPriority = document.createElement("p");
    todoPriority.classList.add("todo-priority");
    todoPriority.textContent = todo.priority;
    todoElement.appendChild(todoPriority);

    const todoTag = document.createElement("div");
    todoTag.classList.add("todo-tag");
    todoTag.textContent = todo.tag;
    todoElement.appendChild(todoTag);

    return todoElement;
  }

  // function that filters todo items by project / tag
}

export default TodoList;
