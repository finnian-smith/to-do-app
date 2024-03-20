import "../styles/project-list.css";
import Project from "../models/project.js";

class ProjectList {
  constructor(projects, container) {
    this.projects = projects;
    this.container = container;
  }

  render() {
    this.container.textContent = "";

    const projectListElement = document.createElement("div");
    projectListElement.classList.add("project-list");

    this.projects.forEach((project) => {
      const projectItem = document.createElement("div"); // maybe a tag?
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

      projectListElement.appendChild(projectItem);
    });

    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "New List";
    addProjectButton.classList.add("add-list-button");
    addProjectButton.addEventListener("click", this.handleAddList.bind(this));
    projectListElement.appendChild(addProjectButton);

    this.container.appendChild(projectListElement);
  }

  handleAddList() {
    // Implement your logic to add a new list here
    // For example, you can open a modal or trigger a form to collect input for the new list
    // Once you collect the necessary information, you can create a new project object and add it to the projects array
    const newListName = prompt("Enter the name of the new list:");
    if (newListName) {
      const newProject = new Project(newListName); // Creating a new project object
      this.projects.push(newProject);
      this.render(); // Re-render the project list to reflect the changes
    }
  }
}

export default ProjectList;
