import "../styles/header-container.css";

class HeaderContainer {
  constructor(container) {
    this.container = container;
  }

  render() {
    this.container.textContent = "";

    const headerIntro = this.createHeaderIntro();
    const headerDatePicker = this.createHeaderDatePicker();

    this.container.appendChild(headerIntro);
    this.container.appendChild(headerDatePicker);
  }

  createHeaderIntro() {
    const headerIntro = document.createElement("div");
    headerIntro.classList.add("header-intro");

    const headerMessage = document.createElement("p");
    headerMessage.classList.add("header-message");
    headerMessage.textContent = "Good Morning, Sullivan! 👋";

    const headerDate = document.createElement("p");
    headerDate.classList.add("header-date");

    headerIntro.appendChild(headerMessage);
    headerIntro.appendChild(headerDate);

    return headerIntro;
  }

  createHeaderDatePicker() {
    const headerDatePicker = document.createElement("div");
    headerDatePicker.classList.add("header-date-picker");

    const dateDropdown = document.createElement("button");
    dateDropdown.setAttribute("id", "date-dropdown");
    dateDropdown.classList.add("date-dropdown");
    dateDropdown.textContent = "Home";

    const datePicker = document.createElement("input");
    datePicker.type = "date";
    datePicker.setAttribute("id", "date-picker");
    datePicker.classList.add("date-picker");
    datePicker.style.display = "none";

    headerDatePicker.appendChild(dateDropdown);
    headerDatePicker.appendChild(datePicker);

    return headerDatePicker;
  }
}

export default HeaderContainer;
