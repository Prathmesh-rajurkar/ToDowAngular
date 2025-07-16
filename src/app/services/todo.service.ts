import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  private storageKey = 'todosByUser';
  private currentUserKey = 'currentUser';

  constructor() {
    const userTodos = this.loadTodosForUser();
    this.todosSubject.next(userTodos);
  }

  getTodo(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  createTodo(todo: Todo): void {
    todo.id = new Date().getTime();
    const todos = this.loadTodosForUser();
    todos.push(todo);
    this.saveTodosForUser(todos);
    this.todosSubject.next(todos);
  }

  deleteTodo(id: number): void {
    let todos = this.loadTodosForUser();
    todos = todos.filter((todo) => todo.id !== id);
    this.saveTodosForUser(todos);
    this.todosSubject.next(todos);
  }

  toggleCompleted(id: number): void {
    const todos = this.loadTodosForUser().map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.saveTodosForUser(todos);
    this.todosSubject.next(todos);
  }

  // 📥 Load only for current user
  private loadTodosForUser(): Todo[] {
    const currentUser = localStorage.getItem(this.currentUserKey);
    if (!currentUser) return [];

    const data = localStorage.getItem(this.storageKey);
    const allTodos = data ? JSON.parse(data) : {};
    return allTodos[currentUser] || [];
  }

  // 💾 Save only for current user
  private saveTodosForUser(todos: Todo[]): void {
    const currentUser = localStorage.getItem(this.currentUserKey);
    if (!currentUser) return;

    const data = localStorage.getItem(this.storageKey);
    const allTodos = data ? JSON.parse(data) : {};
    allTodos[currentUser] = todos;
    localStorage.setItem(this.storageKey, JSON.stringify(allTodos));
  }
}
