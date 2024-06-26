import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private apiUrl = 'http://localhost:3000';

  constructor(private router: Router, private http: HttpClient) {}
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        // Check if the token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp > currentTime) {
          return true;
        }
      } catch (error) {
        return false;
      }
    }
    return false;
  }
  getAccessToken(): string | null {
    return this.accessToken || localStorage.getItem('AccessToken');
  }

  getRefreshToken(): string | null {
    return this.refreshToken || localStorage.getItem('RefreshToken');
  }

  refreshAccessToken(): Observable<string> {
    return this.http
      .post<{ AccessToken: string }>(`${this.apiUrl}/user/refreshtoken`, {
        token: this.getRefreshToken(),
      })
      .pipe(
        map((response) => response.AccessToken),
        tap((newAccessToken) => {
          this.accessToken = newAccessToken;
          localStorage.setItem('AccessToken', newAccessToken);
        })
      );
  }

  logout() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
    this.router.navigate(['']);
  }
}
