import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { Todo } from '../../interfaces/todo';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  allTodos: { [email: string]: Todo[] } = {}; // ✅ FIXED: define this

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.users = this.authService.getAllUsers(); // get users

    // Load all todos from localStorage for each user
    const raw = localStorage.getItem('todosByUser');
    const todosByUser = raw ? JSON.parse(raw) : {};

    this.users.forEach(user => {
      this.allTodos[user.email] = todosByUser[user.email] || [];
    });
  }

  toggleTodo(email: string, id: number): void {
    const todos = this.allTodos[email].map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.allTodos[email] = todos;
    this.saveTodos();
  }

  deleteTodo(email: string, id: number): void {
    const todos = this.allTodos[email].filter(todo => todo.id !== id);
    this.allTodos[email] = todos;
    this.saveTodos();
  }

  private saveTodos(): void {
    localStorage.setItem('todosByUser', JSON.stringify(this.allTodos));
  }
}
