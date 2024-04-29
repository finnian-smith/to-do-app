import "../styles/project-list.css";
import Project from "../models/project.js";
import { createProject } from "../logic/todo-manager.js";
import ButtonContainer from "./button-container.js";
import { toggleStyles, hideModal } from "../logic/modal-action";

class ProjectList {
  constructor(projects, todos, container) {
    this.projects = projects;
    this.todos = todos;
    this.container = container;
  }

  render() {
    this.container.textContent = "";

    const menuContainer = this.createMenuContainer();
    this.container.appendChild(menuContainer);
  }

  // creates the project list items
  createProjectItem(project) {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-list-item");

    const projectColor = document.createElement("div");
    projectColor.classList.add("project-item-color");
    projectColor.style.borderColor = project.projectColor;
    projectItem.appendChild(projectColor);

    const projectTitle = document.createElement("p");
    projectTitle.classList.add("project-item-title");
    projectTitle.textContent = project.title;
    projectItem.appendChild(projectTitle);

    const numTodosElement = document.createElement("p");
    numTodosElement.classList.add("project-item-num-todos");
    const numTodos = project.todoItems.length;
    numTodosElement.textContent = numTodos;
    projectItem.appendChild(numTodosElement);

    projectItem.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        this.toggleMenu();
      }
    });

    return projectItem;
  }

  // creates the project list menu container
  createMenuContainer() {
    const menuContainer = document.createElement("div");
    menuContainer.classList.add("menu-container");

    this.projects.forEach((project) => {
      const projectItem = this.createProjectItem(project);
      menuContainer.appendChild(projectItem);
    });

    const addProjectItem = this.createAddProjectMenuItem();
    menuContainer.appendChild(addProjectItem);

    return menuContainer;
  }

  // creates the item to allow users to add a new project
  createAddProjectMenuItem() {
    const addProjectItem = document.createElement("div"); // should this be button?
    addProjectItem.classList.add("add-list-button");

    const plusSymbol = document.createElement("span");
    plusSymbol.textContent = "+";
    plusSymbol.classList.add("plus-symbol");

    addProjectItem.appendChild(plusSymbol);
    addProjectItem.appendChild(document.createTextNode("Add Project"));

    addProjectItem.addEventListener("click", () => {
      this.toggleMenu();
      this.projectFormInput();
    });

    return addProjectItem;
  }

  handleAddList() {
    // Get the input fields from the form
    const titleInput = document.getElementById("new-list-name");
    const colorInput = document.getElementById("new-list-color");

    const newListName = titleInput.value.trim();
    const newListColor = colorInput.value;

    if (newListName) {
      // check if the project name already exists
      const existingProject = this.projects.find(
        (project) => project.title === newListName
      );

      // check if the project color already exists
      const existingColor = this.projects.find(
        (project) => project.projectColor === newListColor
      );

      let errorMessage = "";

      // determine error message based on flag above
      if (existingProject) {
        errorMessage =
          "A project with the same name already exists. Please enter a unique project name.";
      } else if (existingColor) {
        errorMessage =
          "A project with the same colour tag already exists. Please select a unique colour tag.";
      }

      if (errorMessage) {
        let errorElement = document.querySelector(".error-message");
        if (!errorElement) {
          errorElement = document.createElement("p");
          errorElement.textContent = errorMessage;
          errorElement.classList.add("error-message");

          const projectForm = document.querySelector("form");
          projectForm.appendChild(errorElement);
        } else {
          errorElement.textContent = errorMessage;
        }

        return;
      }

      // clear any existing error message
      const errorElement = document.querySelector(".error-message");
      if (errorElement) {
        errorElement.remove();
      }

      // create a new project
      const newProject = new createProject(newListName, newListColor);
      this.projects.push(newProject);
      this.render();
      hideModal();
    }
  }

  // creates the add project item form
  projectFormInput() {
    const projectFormModal = document.createElement("div");
    projectFormModal.classList.add("modal");
    projectFormModal.classList.add("form-modal");

    const projectForm = document.createElement("form");

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "new-list-name");
    titleLabel.textContent = "Project Name";

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "new-list-name");

    const colorLabel = document.createElement("label");
    colorLabel.setAttribute("for", "new-list-color");
    colorLabel.textContent = "Project Tag Colour";

    const colorInput = document.createElement("input");
    colorInput.setAttribute("type", "color");
    colorInput.setAttribute("id", "new-list-color");

    const projectFormButton = document.createElement("button");
    projectFormButton.setAttribute("type", "submit");
    projectFormButton.textContent = "Add";

    projectForm.appendChild(titleLabel);
    projectForm.appendChild(titleInput);
    projectForm.appendChild(colorLabel);
    projectForm.appendChild(colorInput);
    projectForm.appendChild(projectFormButton);

    // Add event listener for form submission
    projectForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      this.handleAddList(); // Call handleAddList() when the form is submitted
    });

    projectFormModal.appendChild(projectForm);

    document.body.appendChild(projectFormModal);

    return projectForm;
  }

  toggleMenu() {
    toggleStyles();
  }
}

export default ProjectList;
