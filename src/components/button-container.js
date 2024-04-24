import "../styles/button-container.css";
import { toggleStyles } from "../logic/modal-action";

class ButtonContainer {
  constructor(container) {
    this.container = container;
    this.addTodoButton = this.createAddTodoButton();
    this.burgerMenuButton = this.createBurgerMenuButton();
    this.init();
  }

  // creates the burger menu button
  createBurgerMenuButton() {
    const burgerMenuButton = document.createElement("button");
    burgerMenuButton.textContent = "☰";
    burgerMenuButton.classList.add("burger-menu-button");
    burgerMenuButton.addEventListener("click", this.toggleMenu.bind(this));

    return burgerMenuButton;
  }

  createAddTodoButton() {
    const addTodoButton = document.createElement("button");
    addTodoButton.textContent = "+";
    addTodoButton.classList.add("add-todo-button");
    addTodoButton.addEventListener("click", this.toggleMenu.bind(this));

    return addTodoButton;
  }

  createButtonContainer(addTodoButton, burgerMenuButton) {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(addTodoButton);
    buttonContainer.appendChild(burgerMenuButton);

    return buttonContainer;
  }

  init() {
    const buttonContainer = this.createButtonContainer(
      this.addTodoButton,
      this.burgerMenuButton
    );
    this.container.appendChild(buttonContainer);
  }

  toggleMenu() {
    toggleStyles();
  }
}

export default ButtonContainer;
