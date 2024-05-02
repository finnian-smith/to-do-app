function updateProjectCount(projects) {
  const projectItems = document.querySelectorAll(".project-item-title");
  let totalCount = 0;

  // update individual project counts and calculate total count
  projectItems.forEach((item) => {
    const projectTitle = item.textContent;
    const projectToUpdate = projects.find(
      (project) => project.title === projectTitle
    );

    const numTodosElement = item.parentElement.querySelector(
      ".project-item-num-todos"
    );
    const projectCount = projectToUpdate.todoItems.length;
    numTodosElement.textContent = projectCount;
    if (projectTitle !== "General") {
      totalCount += projectCount;
    }
  });

  // update count for the "General" project
  const generalProjectItem = document.querySelector(".project-item-title");
  if (generalProjectItem && generalProjectItem.textContent === "General") {
    const generalNumTodosElement =
      generalProjectItem.parentElement.querySelector(".project-item-num-todos");
    if (generalNumTodosElement) {
      const generalProjectCount = totalCount;
      generalNumTodosElement.textContent = generalProjectCount;
    }
  }
}

export { updateProjectCount };
