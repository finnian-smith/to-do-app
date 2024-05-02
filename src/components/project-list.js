import "../styles/project-list.css";
import {
  createProject,
  updateProject,
  deleteProject,
} from "../logic/todo-manager.js";
import { toggleStyles, hideModal } from "../logic/modal-action";
import { renderTodoList } from "../logic/render.js";
import { updateProjectCount } from "../logic/util-functions.js";

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

    const editElement = document.createElement("div");
    editElement.classList.add("edit-project-item-button");
    editElement.innerHTML = `<i class="fa-solid fa-ellipsis-vertical"></i>`;
    projectItem.appendChild(editElement);

    const numTodosElement = document.createElement("p");
    numTodosElement.classList.add("project-item-num-todos");
    const numTodos = project.todoItems.length;
    numTodosElement.textContent = numTodos;
    projectItem.appendChild(numTodosElement);

    editElement.addEventListener("click", (event) => {
      if (window.innerWidth < 768) {
        this.toggleMenu();
      }
      event.stopPropagation();
      this.editProjectItem(project);
    });

    projectItem.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        this.toggleMenu();
      }
    });

    return projectItem;
  }

  // edit project item
  editProjectItem(project) {
    const editProjectFormModal = document.createElement("div");
    editProjectFormModal.classList.add("modal");
    editProjectFormModal.classList.add("form-modal");

    const editProjectForm = document.createElement("form");
    editProjectForm.classList.add("edit-form");

    // create delete button
    const deleteElement = document.createElement("div");
    deleteElement.classList.add("delete-project-item-button");
    deleteElement.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    editProjectForm.appendChild(deleteElement);

    // create input fields
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "edit-project-name");
    titleLabel.textContent = "Project Name";

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "edit-project-name");
    titleInput.setAttribute("maxlength", "10");
    titleInput.value = project.title;

    const colorLabel = document.createElement("label");
    colorLabel.setAttribute("for", "edit-project-color");
    colorLabel.textContent = "Project Tag Colour";

    const colorInput = document.createElement("input");
    colorInput.setAttribute("type", "color");
    colorInput.setAttribute("id", "edit-project-color");
    colorInput.value = project.projectColor;

    // create update button
    const editProjectFormButton = document.createElement("button");
    editProjectFormButton.setAttribute("type", "submit");
    editProjectFormButton.textContent = "Update";

    // append input fields and button to the form
    editProjectForm.appendChild(titleLabel);
    editProjectForm.appendChild(titleInput);
    editProjectForm.appendChild(colorLabel);
    editProjectForm.appendChild(colorInput);
    editProjectForm.appendChild(editProjectFormButton);

    // add event listener for form submission
    editProjectForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const newName = titleInput.value.trim();
      const newColor = colorInput.value;

      // ignore if no title is entered when updating
      if (!newName) {
        return;
      }

      updateProject(project, { title: newName, projectColor: newColor });

      this.toggleMenu();
      this.render();
      renderTodoList(this.projects, this.todos);
    });

    // add event listener for delete
    deleteElement.addEventListener("click", (event) => {
      event.stopPropagation();

      deleteProject(this.projects, project, this.todos);

      this.toggleMenu();
      this.render();
      renderTodoList(this.projects, this.todos);
    });

    editProjectFormModal.appendChild(editProjectForm);
    document.body.appendChild(editProjectFormModal);
  }

  // create the project list menu container
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

  // create the item to allow users to add a new project
  createAddProjectMenuItem() {
    const addProjectItem = document.createElement("div");
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

  // add project item to project list
  handleAddProject() {
    const titleInput = document.querySelector("#new-list-name");
    const colorInput = document.querySelector("#new-list-color");

    const newListName = titleInput.value.trim();
    const newListColor = colorInput.value;

    if (newListName) {
      const existingProject = this.projects.find(
        (project) => project.title === newListName
      );

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
      updateProjectCount(this.projects);
      hideModal();
    }
  }

  // create the add project item form
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
    titleInput.setAttribute("maxlength", "10");

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

    // add event listener for form submission
    projectForm.addEventListener("submit", (event) => {
      event.preventDefault(); // prevent default form submission behavior
      this.handleAddProject();
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
