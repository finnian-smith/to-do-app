class Todo {
  constructor(title, dueDate, priority, tag) {
    this.id = Todo.nextId();
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.tag = tag;
    this.completed = false;
  }

  static nextId() {
    if (!this.latestId) {
      this.latestId = 1;
    } else {
      this.latestId++;
    }
    return this.latestId;
  }

  markAsComplete() {
    this.completed = true;
  }

  markAsIncomplete() {
    this.completed = false;
  }
}

export default Todo;
