import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/interfaces/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}
  ngOnInit(): void {
    this.todoService.getTodo().subscribe((todos: Todo[]) => {
      this.todos = todos;
    });
  }
  onDelete(id: number) {
    this.todoService.deleteTodo(id);
  }

  toggleCompleted(todo: Todo) {
    this.todoService.toggleCompleted(todo.id);
  }
}
