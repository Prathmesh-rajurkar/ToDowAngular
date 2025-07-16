import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/interfaces/todo';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent implements OnInit {
  todo: Todo | undefined;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodo().subscribe((todos) => {
      this.todo = todos.find((t) => t.id === id);
    });
  }
  toggleCompleted(todo: Todo) {
    this.todoService.toggleCompleted(todo.id);
  }

  onDelete(id: number) {
    this.todoService.deleteTodo(id);
  }
}
