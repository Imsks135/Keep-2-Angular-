import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isLoggedIn: boolean = false;
  username: string = '';
  private authApiUrl = 'http://localhost:3000/auth/v1';


  constructor(private http: HttpClient) {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedLoggedIn === 'true') {
      this.isLoggedIn = true;

      this.isUserAuthenticated('dummy_token').subscribe(
        (userDetails) => {
          this.username = userDetails.username;
        },
        (error) => {
          console.error('Error fetching user details:', error);
          this.isLoggedIn = false;
          this.username = '';
          localStorage.setItem('isLoggedIn', 'false');
        }
      );
    }
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.authApiUrl}/users`);
  }

  authenticateUser(username: string, password: string): Observable<any> {
    return this.getUsers().pipe(
      switchMap((users: any[]) => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          this.isLoggedIn = true;
          this.username = user.username;
          localStorage.setItem('isLoggedIn', 'true');
          // Set bearer token (if applicable)
          this.setBearerToken('dummy_token');
          return of(user); // Return the user details
        } else {
          return throwError('Invalid credentials');
        }
      }),
      catchError((error) => {
        console.error('Authentication error:', error);
        return throwError('Something went wrong with authentication.');
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.username = '';
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    // Remove bearer token
    localStorage.removeItem('bearerToken');
  }

  setBearerToken(token: string) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token: string) {
    return this.http.get<any>(`${this.authApiUrl}/isAuthenticated`);
  }
}
