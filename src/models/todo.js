class Todo {
  constructor(title, dueDate, priority, tag) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.tag = tag;
    this.completed = false;
  }

  markAsComplete() {
    this.completed = true;
  }

  markAsIncomplete() {
    this.completed = false;
  }
}

export default Todo;
