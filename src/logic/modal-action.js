function toggleStyles() {
  const menuContainer = document.querySelector(".menu-container");
  const burgerMenuButton = document.querySelector(".burger-menu-button");
  const buttonContainer = document.querySelector(".button-container");

  // only toggles styles on mobile devices
  if (window.innerWidth < 768) {
    menuContainer.classList.toggle("show-menu");
    burgerMenuButton.classList.toggle("hidden");
    buttonContainer.classList.toggle("hidden");

    if (menuContainer.classList.contains("show-menu")) {
      showModal();
    } else {
      hideModal();
    }
  } else {
    hideModal();
  }
}

function showModal() {
  const modalCover = document.querySelector(".modal");
  if (!modalCover) {
    const modalCover = document.createElement("div");
    modalCover.classList.add("modal");
    document.body.appendChild(modalCover);
  }
}

function hideModal() {
  const modalCover = document.querySelector(".modal");
  if (modalCover) {
    modalCover.remove();
  }
}

export { toggleStyles, showModal, hideModal };
