import "../styles/project-list.css";
import Project from "../models/project.js";

class ProjectList {
  constructor(projects, container) {
    this.projects = projects;
    this.container = container;
  }

  render() {
    this.container.textContent = "";

    const projectListElement = this.createProjectList();
    const burgerMenuButton = this.createBurgerMenuButton();
    const menuContainer = this.createMenuContainer();

    this.container.appendChild(burgerMenuButton);
    this.container.appendChild(menuContainer);
    this.container.appendChild(projectListElement);
  }

  createProjectList() {
    const projectListElement = document.createElement("div");
    projectListElement.classList.add("project-list");

    this.projects.forEach((project) => {
      const projectItem = this.createProjectItem(project);
      projectListElement.appendChild(projectItem);
    });

    return projectListElement;
  }

  createProjectItem(project) {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-list-item");

    const projectTitle = document.createElement("p");
    projectTitle.classList.add("project-item-title");
    projectTitle.textContent = project.title;
    projectItem.appendChild(projectTitle);

    const numTodosElement = document.createElement("p");
    numTodosElement.classList.add("project-item-num-todos");
    const numTodos = project.todoItems.length;
    numTodosElement.textContent = numTodos;
    projectItem.appendChild(numTodosElement);

    return projectItem;
  }

  createBurgerMenuButton() {
    const burgerMenuButton = document.createElement("button");
    burgerMenuButton.textContent = "☰";
    burgerMenuButton.classList.add("burger-menu-button");
    burgerMenuButton.addEventListener("click", this.toggleMenu.bind(this));

    return burgerMenuButton;
  }

  createMenuContainer() {
    const menuContainer = document.createElement("div");
    menuContainer.classList.add("menu-container");

    this.projects.forEach((project) => {
      const projectItem = this.createProjectMenuItem(project);
      menuContainer.appendChild(projectItem);
    });

    const addProjectItem = this.createAddProjectMenuItem();
    menuContainer.appendChild(addProjectItem);

    return menuContainer;
  }

  createProjectMenuItem(project) {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-menu-item");
    projectItem.textContent = project.title;
    projectItem.addEventListener("click", () => {
      console.log(`Clicked on project: ${project.title}`);
      this.toggleMenu();
    });

    return projectItem;
  }

  createAddProjectMenuItem() {
    const addProjectItem = document.createElement("div");
    addProjectItem.classList.add("add-project-menu-item");
    addProjectItem.textContent = "Add Project";
    addProjectItem.addEventListener("click", () => {
      console.log("Clicked on Add Project");
      this.handleAddList();
      this.toggleMenu();
    });

    return addProjectItem;
  }

  handleAddList() {
    const newListName = prompt("Enter the name of the new list:");
    if (newListName) {
      const newProject = new Project(newListName);
      this.projects.push(newProject);
      this.render();
    }
  }

  toggleMenu() {
    const menuContainer = document.querySelector(".menu-container");
    menuContainer.classList.toggle("show-menu");
    const burgerMenuButton = document.querySelector(".burger-menu-button");

    const modalCover = document.createElement("div");
    modalCover.classList.add("modal");
    this.container.appendChild(modalCover);

    if (menuContainer.classList.contains("show-menu")) {
      burgerMenuButton.style.display = "none";
      modalCover.classList.add("show-modal");
    } else {
      burgerMenuButton.style.display = "block";
      modalCover.classList.remove("show-modal");
    }
  }
}

export default ProjectList;
