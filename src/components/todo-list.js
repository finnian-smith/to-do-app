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
  }

  // function to create date headers
  createDateHeaders() {
    const dates = this.getUniqueDates();

    dates.forEach((date) => {
      const displayDate = this.getDisplayDate(date);
      const dateElement = this.createDateElement(displayDate);
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

  // function to create each todo item

  // function that filters todo items by project / tag
}

export default TodoList;
