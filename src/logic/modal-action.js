function toggleStyles() {
  const menuContainer = document.querySelector(".menu-container");
  menuContainer.classList.toggle("show-menu");

  const modalCover = document.querySelector(".modal");
  if (modalCover) {
    hideModal();
  } else {
    showModal();
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
