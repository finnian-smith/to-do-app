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

  updateDetails({ title, dueDate, priority, tag }) {
    if (title !== undefined) this.title = title;
    if (dueDate !== undefined) this.dueDate = dueDate;
    if (priority !== undefined) this.priority = priority;
    if (tag !== undefined) this.tag = tag;
  }
}

export default Todo;
