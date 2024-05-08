import "../styles/button-container.css";
import { toggleMenu } from "../logic/modal-action";

class ButtonContainer {
  constructor(container) {
    this.container = container;
    this.addTodoButton = this.createAddTodoButton();
    this.burgerMenuButton = this.createBurgerMenuButton();
  }

  render() {
    this.container.textContent = "";

    const buttonContainer = this.createButtonContainer(
      this.addTodoButton,
      this.burgerMenuButton
    );
    this.container.appendChild(buttonContainer);
  }

  // creates the burger menu button
  createBurgerMenuButton() {
    const burgerMenuButton = document.createElement("button");
    burgerMenuButton.textContent = "☰";
    burgerMenuButton.classList.add("burger-menu-button");

    burgerMenuButton.addEventListener("click", () => toggleMenu());

    return burgerMenuButton;
  }

  // creates the add todo button
  createAddTodoButton() {
    const addTodoButton = document.createElement("button");
    addTodoButton.classList.add("add-todo-button");

    const buttonSymbol = document.createElement("span");
    buttonSymbol.textContent = "+";
    buttonSymbol.classList.add("add-todo-button-symbol");
    addTodoButton.appendChild(buttonSymbol);

    const buttonText = document.createElement("span");
    buttonText.textContent = "Add To-Do";
    buttonText.classList.add("add-todo-button-text");
    addTodoButton.appendChild(buttonText);

    addTodoButton.addEventListener("click", () => toggleMenu());

    return addTodoButton;
  }

  // creates the button container
  createButtonContainer(addTodoButton, burgerMenuButton) {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(addTodoButton);
    buttonContainer.appendChild(burgerMenuButton);

    return buttonContainer;
  }
}

export default ButtonContainer;
