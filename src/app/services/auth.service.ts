import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface User {
  id?: number;
  email: string;
  firstName?: string;
  lastName?: string;
  refreshToken?: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9002/api/v1';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { username: email, password })
      .pipe(
        map(response => {
          // Stocker les détails de l'utilisateur et le jeton JWT dans le stockage local
          const user: User = {
            email: response.username,
            refreshToken: response.refreshToken,
            token: response.token,
            id: response.id
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
        catchError(error => {
          console.error('Login error:', error);
          throw error;
        })
      );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user)
      .pipe(
        catchError(error => {
          console.error('Registration error:', error);
          throw error;
        })
      );
  }

  logout(): void {
    // Supprimer l'utilisateur du stockage local
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/customer/password/reset`, { email })
      .pipe(
        catchError(error => {
          console.error('Forgot password error:', error);
          throw error;
        })
      );
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }
}
