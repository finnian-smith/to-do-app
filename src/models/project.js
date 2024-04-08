class Project {
  constructor(title, projectColor) {
    this.title = title;
    this.projectColor = projectColor;
    this.todoItems = [];
  }

  addTodo(todo) {
    this.todoItems.push(todo);
  }
}

export default Project;
