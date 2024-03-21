import "../styles/project-list.css";
import Project from "../models/project.js";

class ProjectList {
  constructor(projects, container) {
    this.projects = projects;
    this.container = container;
    this.isMobile = window.innerWidth < 768;
    this.render();
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  handleResize() {
    const newIsMobile = window.innerWidth < 768;
    if (newIsMobile !== this.isMobile) {
      this.isMobile = newIsMobile;
      this.render();
    }
  }

  render() {
    this.container.textContent = "";

    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      this.renderForMobile();
    } else {
      this.renderForDesktop();
    }
  }

  renderForMobile() {
    const burgerMenuButton = this.createBurgerMenuButton();
    const menuContainer = this.createMenuContainer();
    this.container.appendChild(burgerMenuButton);
    this.container.appendChild(menuContainer);
  }

  renderForDesktop() {
    const projectListElement = this.createProjectList();
    this.container.appendChild(projectListElement);
  }

  // creates the project list by appending project items to list
  createProjectList() {
    const projectListElement = document.createElement("div");
    projectListElement.classList.add("project-list");

    this.projects.forEach((project) => {
      const projectItem = this.createProjectItem(project);
      projectListElement.appendChild(projectItem);
    });

    const addProjectItem = this.createAddProjectMenuItem();
    projectListElement.appendChild(addProjectItem);

    return projectListElement;
  }

  // creates the project list items
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

    projectItem.addEventListener("click", () => {
      console.log(`Clicked on project: ${project.title}`);
      this.toggleMenu();
    });

    return projectItem;
  }

  // creates the burger menu button
  createBurgerMenuButton() {
    const burgerMenuButton = document.createElement("button");
    burgerMenuButton.textContent = "☰";
    burgerMenuButton.classList.add("burger-menu-button");
    burgerMenuButton.addEventListener("click", this.toggleMenu.bind(this));

    return burgerMenuButton;
  }

  // creates the burger menu container
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
    const addProjectItem = document.createElement("div");
    addProjectItem.classList.add("add-list-button");
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
