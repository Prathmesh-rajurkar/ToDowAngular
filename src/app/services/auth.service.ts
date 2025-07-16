import { Injectable } from '@angular/core';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersKey = 'users';
  private currentUserKey = 'currentUser';

  constructor() {}

  register(user: User): boolean {
    const users = this.getUsers();
    const userExists = users.find(u => u.email === user.email);
    if (userExists) return false;

    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const validUser = users.find(u => u.email === email && u.password === password);
    if (validUser) {
      localStorage.setItem(this.currentUserKey, email);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): string | null {
    return localStorage.getItem(this.currentUserKey);
  }

  private getUsers(): User[] {
    const data = localStorage.getItem(this.usersKey);
    return data ? JSON.parse(data) : [];
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}
