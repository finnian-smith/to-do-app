import "../styles/todo-list.css";
import {
  createTodo,
  addTodoToProject,
  updateTodo,
  deleteTodoItem,
} from "../logic/todo-manager.js";
import { format, isToday, isTomorrow } from "date-fns";
import { hideModal } from "../logic/modal-action.js";
import { updateProjectCount } from "../logic/util-functions.js";

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

    const editElement = document.createElement("div");
    editElement.classList.add("edit-todo-item-button");
    editElement.innerHTML = `<i class="fa-solid fa-ellipsis-vertical"></i>`;
    todoItemRight.appendChild(editElement);

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

    editElement.addEventListener("click", (event) => {
      event.stopPropagation();
      this.editTodoItem(todo);
    });

    // update the project count when a new todo is added
    const projectToUpdate = this.projects.find(
      (project) => project.title === todo.tag
    );
    if (projectToUpdate) {
      // check if the todo already exists in the project's todoItems
      const existingTodoIndex = projectToUpdate.todoItems.findIndex(
        (existingTodo) => existingTodo.id === todo.id
      );
      if (existingTodoIndex === -1) {
        projectToUpdate.todoItems.push(todo);
      }
      updateProjectCount(this.projects);
    }

    return todoElement;
  }

  // edit todo item
  editTodoItem(todo) {
    const editTodoFormModal = document.createElement("div");
    editTodoFormModal.classList.add("modal");
    editTodoFormModal.classList.add("form-modal");

    const editTodoForm = document.createElement("form");
    editTodoForm.classList.add("edit-form");

    // create delete button
    const deleteElement = document.createElement("div");
    deleteElement.classList.add("delete-todo-item-button");
    deleteElement.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    editTodoForm.appendChild(deleteElement);

    // create input fields
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "edit-todo-name");
    titleLabel.textContent = "To-Do";

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "edit-todo-name");
    titleInput.value = todo.title;

    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "edit-todo-date");
    dateLabel.textContent = "Due Date";

    const dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "edit-todo-date");
    dateInput.value = todo.dueDate;

    const priorityLabel = document.createElement("label");
    priorityLabel.setAttribute("for", "edit-todo-priority");
    priorityLabel.textContent = "Priority";

    const priorityInput = document.createElement("select");
    const priorities = ["Low", "Medium", "High"];
    priorities.forEach((priorityText) => {
      const priorityOption = document.createElement("option");
      priorityOption.value = priorityText;
      priorityOption.textContent = priorityText;
      priorityInput.appendChild(priorityOption);
    });
    priorityInput.setAttribute("id", "edit-todo-priority");
    priorityInput.value = todo.priority;

    const tagLabel = document.createElement("label");
    tagLabel.setAttribute("for", "edit-todo-tag");
    tagLabel.textContent = "Tag";

    const tagInput = document.createElement("select");
    const projects = document.querySelectorAll(".project-list-item");
    const projectTitles = [...projects].map((project) => {
      const titleElement = project.querySelector(".project-item-title");
      return titleElement.textContent;
    });
    const filteredProjectTitles = projectTitles.filter(
      (title) => title !== "General"
    );
    filteredProjectTitles.forEach((titleText) => {
      const titleOption = document.createElement("option");
      titleOption.value = titleText;
      titleOption.textContent = titleText;
      tagInput.appendChild(titleOption);
    });
    tagInput.setAttribute("id", "edit-todo-tag");
    tagInput.value = todo.tag;

    // create update button
    const editTodoFormButton = document.createElement("button");
    editTodoFormButton.setAttribute("type", "submit");
    editTodoFormButton.textContent = "Update";

    // append input fields and button to the form
    editTodoForm.appendChild(titleLabel);
    editTodoForm.appendChild(titleInput);
    editTodoForm.appendChild(dateLabel);
    editTodoForm.appendChild(dateInput);
    editTodoForm.appendChild(priorityLabel);
    editTodoForm.appendChild(priorityInput);
    editTodoForm.appendChild(tagLabel);
    editTodoForm.appendChild(tagInput);
    editTodoForm.appendChild(editTodoFormButton);

    // add event listener for form submission
    editTodoForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const newName = titleInput.value.trim();
      const newDate = dateInput.value;
      const newPriority = priorityInput.value;
      const newTag = tagInput.value;

      updateTodo(
        todo,
        {
          title: newName,
          dueDate: newDate,
          priority: newPriority,
          tag: newTag,
          completed: todo.completed,
        },
        this.projects
      );

      hideModal();
      this.orderTodoItems(todo);
      this.render();
    });

    // add event listener for delete
    deleteElement.addEventListener("click", (event) => {
      event.stopPropagation();

      // delete todo
      deleteTodoItem(todo, this.todos, this.projects);

      console.log(this.todos);

      hideModal();
      this.render();
    });

    editTodoFormModal.appendChild(editTodoForm);
    document.body.appendChild(editTodoFormModal);
  }

  // create the add project item form
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
    const filteredProjectTitles = projectTitles.filter(
      (title) => title !== "General"
    );
    filteredProjectTitles.forEach((titleText) => {
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

    // add event listener for form submission
    todoForm.addEventListener("submit", (event) => {
      event.preventDefault(); // prevent default form submission behavior
      this.handleAddTodo();
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

  // create todo item and add it to a project
  handleAddTodo() {
    const titleInput = document.querySelector("#new-todo-name").value.trim();
    const dateInput = document.querySelector("#new-todo-date").value;
    const priorityInput = document.querySelector("#new-todo-priority").value;
    const tagInput = document.querySelector("#new-todo-tag").value;

    const missingFormValues = !(
      titleInput &&
      dateInput &&
      priorityInput &&
      tagInput
    );

    if (missingFormValues) {
      this.displayTodoFormErrorMessage(
        "One or more fields are empty. Please fill out all fields."
      );
      return;
    }

    const newTodo = createTodo(titleInput, dateInput, priorityInput, tagInput);
    this.orderTodoItems(newTodo);

    const project = this.projects.find((project) => project.title === tagInput);
    addTodoToProject(project, newTodo);

    // check todo items
    console.log(this.todos);

    this.render();
    hideModal();
  }

  orderTodoItems(todo) {
    let index = -1;

    const existingIndex = this.todos.findIndex(
      (existingTodo) => existingTodo.id === todo.id
    );

    // if todo already exists -> remove it from its current position
    if (existingIndex !== -1) {
      this.todos.splice(existingIndex, 1);
    }

    // find correct position for todo based on due date
    index = this.todos.findIndex(
      (existingTodo) => new Date(existingTodo.dueDate) > new Date(todo.dueDate)
    );
    if (index === -1) {
      index = this.todos.length;
    }

    // insert todo into the sorted array of todos at the correct position
    this.todos.splice(index, 0, todo);
  }

  // display error message for todo input form
  displayTodoFormErrorMessage(message) {
    let errorElement = document.querySelector(".error-message");

    if (!errorElement) {
      errorElement = document.createElement("p");
      errorElement.textContent = message;
      errorElement.classList.add("error-message");

      const todoForm = document.querySelector("form");
      todoForm.appendChild(errorElement);
    } else {
      errorElement.textContent = message;
    }
  }

  // filter todo items by project / tag or date
  filterTodoItems(filterValue = { type: "project", value: "General" }) {
    this.container.textContent = "";

    let filteredTodos = [];

    if (filterValue.type === "project") {
      filteredTodos = this.todos.filter((todo) => {
        return (
          filterValue.value === "General" || filterValue.value === todo.tag
        );
      });
    } else if (filterValue.type === "date") {
      filteredTodos = this.todos.filter((todo) => {
        return todo.dueDate === filterValue.value;
      });
    } else if (filterValue.type === "project-date") {
      filteredTodos = this.todos.filter((todo) => {
        return (
          todo.dueDate === filterValue.date &&
          (filterValue.project === "General" ||
            filterValue.project === todo.tag)
        );
      });
    } else {
      // handle invalid filter type
      console.error("Invalid filter type");
      return;
    }

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

  // set tag color
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
