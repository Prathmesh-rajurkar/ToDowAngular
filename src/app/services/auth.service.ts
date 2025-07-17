import { Injectable } from '@angular/core';

export interface User {
  email: string;
  password: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersKey = 'users';
  private currentUserKey = 'currentUser';

  constructor() {
    // Initialize with a default admin if not present
    if (this.getUsers().length === 0) {
      this.register({
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
      });
    }
  }

  // ✅ Get all users from localStorage
  private getUsers(): User[] {
    const data = localStorage.getItem(this.usersKey);
    return data ? JSON.parse(data) : [];
  }

  // ✅ Save all users to localStorage
  private saveUsers(users: User[]) {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  // ✅ Register user
  register(user: User): boolean {
    const users = this.getUsers();
    const exists = users.some((u) => u.email === user.email);
    if (exists) return false;
    users.push(user);
    this.saveUsers(users);
    return true;
  }

  // ✅ Login and store full user
  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const validUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (validUser) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(validUser));
      return true;
    }
    return false;
  }

  // ✅ Logout
  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  // ✅ Get current user
  getCurrentUser(): User | null {
    const data = localStorage.getItem(this.currentUserKey);
    return data ? JSON.parse(data) : null;
  }

  // ✅ Get all users (admin)
  getAllUsers(): User[] {
    return this.getUsers();
  }

  // ✅ Check if logged in
  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  // ✅ Check if current user is admin
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }
}
