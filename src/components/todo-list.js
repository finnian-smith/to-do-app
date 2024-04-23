import "../styles/todo-list.css";
import Todo from "../models/todo.js";
import { createTodo, addTodoToProject } from "../logic/todo-manager.js";
import { format, isToday, isTomorrow } from "date-fns";

class TodoList {
  constructor(todos, projects, container) {
    this.todos = todos;
    this.projects = projects;
    this.container = container;
  }

  render() {
    this.container.textContent = "";

    this.createDateHeaders();
    this.appendTodoByDate();

    // CALLING HERE TO MAKE IT ATTACH??? IS THERE A BETTER WAY?
    this.attachFormInput();
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

    // Update the project count when a new todo is added
    const projectToUpdate = this.projects.find(
      (project) => project.title === todo.tag
    );
    if (projectToUpdate) {
      // Check if the todo already exists in the project's todoItems
      const existingTodoIndex = projectToUpdate.todoItems.findIndex(
        (existingTodo) => existingTodo.title === todo.title
      );
      if (existingTodoIndex === -1) {
        projectToUpdate.todoItems.push(todo);
      }
      this.updateProjectCount();
    }

    return todoElement;
  }

  updateProjectCount() {
    const projectItems = document.querySelectorAll(".project-item-title");
    let totalCount = 0;

    // Update individual project counts and calculate total count
    projectItems.forEach((item) => {
      const projectTitle = item.textContent;
      const projectToUpdate = this.projects.find(
        (project) => project.title === projectTitle
      );

      const numTodosElement = item.parentElement.querySelector(
        ".project-item-num-todos"
      );
      const projectCount = projectToUpdate.todoItems.length;
      numTodosElement.textContent = projectCount;
      if (projectTitle !== "General") {
        totalCount += projectCount;
      }
    });

    // Update count for the "General" project
    const generalProjectItem = document.querySelector(".project-item-title");
    if (generalProjectItem && generalProjectItem.textContent === "General") {
      const generalNumTodosElement =
        generalProjectItem.parentElement.querySelector(
          ".project-item-num-todos"
        );
      if (generalNumTodosElement) {
        const generalProjectCount = totalCount;
        generalNumTodosElement.textContent = generalProjectCount;
      }
    }
  }

  // creates the add project item form
  todoFormInput() {
    let todoFormModal = document.querySelector(".modal.form-modal");

    if (!todoFormModal) {
      todoFormModal = document.createElement("div");
      todoFormModal.classList.add("modal");
      todoFormModal.classList.add("form-modal");
    } else {
      todoFormModal.innerHTML = "";
    }

    const todoForm = document.createElement("form");

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "new-todo-name");
    titleLabel.textContent = "To-Do";

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "new-todo-name");

    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "new-todo-date");
    dateLabel.textContent = "Due Date";

    const dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "new-todo-date");

    const priorityLabel = document.createElement("label");
    priorityLabel.setAttribute("for", "new-todo-priority");
    priorityLabel.textContent = "Priority";

    const priorityInput = document.createElement("select");
    const priorities = ["Low", "Medium", "High"];
    priorities.forEach((priorityText) => {
      const priorityOption = document.createElement("option");
      priorityOption.value = priorityText;
      priorityOption.textContent = priorityText;
      priorityInput.appendChild(priorityOption);
    });
    priorityInput.setAttribute("id", "new-todo-priority");

    const tagLabel = document.createElement("label");
    tagLabel.setAttribute("for", "new-todo-tag");
    tagLabel.textContent = "Tag";

    const tagInput = document.createElement("select");
    const projects = document.querySelectorAll(".project-list-item");
    const projectTitles = [...projects].map((project) => {
      const titleElement = project.querySelector(".project-item-title");
      return titleElement.textContent;
    });
    projectTitles.forEach((titleText) => {
      const titleOption = document.createElement("option");
      titleOption.value = titleText;
      titleOption.textContent = titleText;
      tagInput.appendChild(titleOption);
    });
    tagInput.setAttribute("id", "new-todo-tag");

    const todoFormButton = document.createElement("button");
    todoFormButton.setAttribute("type", "submit");
    todoFormButton.textContent = "Add";

    todoForm.appendChild(titleLabel);
    todoForm.appendChild(titleInput);
    todoForm.appendChild(dateLabel);
    todoForm.appendChild(dateInput);
    todoForm.appendChild(priorityLabel);
    todoForm.appendChild(priorityInput);
    todoForm.appendChild(tagLabel);
    todoForm.appendChild(tagInput);
    todoForm.appendChild(todoFormButton);

    // Add event listener for form submission
    todoForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      this.handleAddTodo();
      console.log("logging!");
    });

    todoFormModal.appendChild(todoForm);

    document.body.appendChild(todoFormModal);

    return todoForm;
  }

  // attach formInput event listener
  attachFormInput() {
    document.addEventListener("click", (event) => {
      if (event.target && event.target.matches(".add-todo-button")) {
        this.todoFormInput();
      }
    });
  }

  handleAddTodo() {
    const titleInput = document.querySelector("#new-todo-name");
    const dateInput = document.querySelector("#new-todo-date");
    const priorityInput = document.querySelector("#new-todo-priority");
    const tagInput = document.querySelector("#new-todo-tag");

    const newTodoTitle = titleInput.value.trim();
    const newTodoDate = dateInput.value;
    const newTodoPriority = priorityInput.value;
    const newTodoTag = tagInput.value;

    console.log(newTodoTitle);
    console.log(newTodoDate);
    console.log(newTodoPriority);
    console.log(newTodoTag);

    if (
      newTodoTitle === "" ||
      newTodoDate === "" ||
      newTodoPriority === "" ||
      newTodoTag === ""
    ) {
      // Display an error message or handle the case where one or more fields are empty
      console.error(
        "One or more fields are empty. Please fill out all fields."
      );
    } else {
      // All fields are filled, proceed with form submission or other actions
      const newTodo = createTodo(
        newTodoTitle,
        newTodoDate,
        newTodoPriority,
        newTodoTag
      );
      this.todos.push(newTodo);
      // below doesn't work as we need actual project, not just a string
      // HOW TO GET PROJECT INFORMATION HERE?
      const project = this.projects.find(
        (project) => project.title === newTodoTag
      );
      if (project) {
        addTodoToProject(project, newTodo); // Add the new todo to the project
        console.log("added");
      } else {
        console.log("no bueno!");
      }
      // addTodoToProject(project, newTodo);
      this.render();
      this.hideModal();
    }
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

  hideModal() {
    const modalCover = document.querySelector(".modal");
    if (modalCover) {
      modalCover.remove();
    }
  }
}

export default TodoList;
