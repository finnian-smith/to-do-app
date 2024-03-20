class Project {
  constructor(title) {
    this.title = title;
    this.todoItems = [];
  }

  addTodo(todo) {
    this.todoItems.push(todo);
  }
}

export default Project;
