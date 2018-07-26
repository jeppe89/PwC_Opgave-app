import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { TokenService } from './token.service';
import { HeaderService } from './header.service';
import { IToken } from './token.interface';
import { NotificationService } from './notification.service';
import { HandleError, HttpErrorHandlerService } from './http-error-handler.service';

@Injectable()
export class AuthService {
  url = 'http://localhost:8000/api/auth/';
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private headerService: HeaderService,
    private notificationService: NotificationService,
    private httpErrorHandler: HttpErrorHandlerService) {
      this.handleError = this.httpErrorHandler.createHandleError('AuthService');
    }

  /**
   * Login the user
   * @param email The user's email
   * @param password The user's password
   * @param navigateTo Navigate to this url after login
   * @returns Observable subscription
   */
  login(email: string, password: string, navigateTo?: string): Subscription {
    // Set up the required request object
    const object = {
      data: {
        email: email,
        password: password
      }
    };

    return this.httpClient
      .post(this.url + 'login', object)
      .pipe(
        catchError(this.handleError('login'))
      ).subscribe(
        response => {
          // Set the token from the response in local storage
          this.tokenService.setToken(response['data']['access_token']);
          // Decode the token
          const decodedToken = this.tokenService.decodeToken();
          // Set the name from the token in the header
          this.headerService.setDisplayedUser(decodedToken.name);
          // Navigate to the provided URL
          this.router.navigate([navigateTo]);
          // Set admin if the token contains the Admin role
          this.setAdmin();
          // Notify the user that he is logged in
          this.notificationService.notificationSubject.next('Du er nu logget ind');
        },
        error => {
          console.log(error);
        }
      );
  }
  /**
   * Logout the user
   * @param navigateTo Navigate to this URL after logout
   */
  logout(navigateTo?: string) {
    this.httpClient
      .post(this.url + 'logout', {})
      .pipe(
        catchError(this.handleError('logout'))
      ).subscribe(
        response => {
          // Remove the token from local storage
          this.tokenService.removeToken();
          // Remove the logged in user name from the header
          this.headerService.removeDisplayedUser();
          // Set admin rights to false
          this.headerService.setAdmin(false);
          // Navigate to the provided URL
          this.router.navigateByUrl('/login', {skipLocationChange: true})
            .then(() => this.router.navigate([navigateTo]));
          // Notify the user that he is logged out
          this.notificationService.notificationSubject.next('Du er nu logget ud');
        },
        error => {
          console.log(error);
        }
      );
  }
  /**
   * Get the user name from the header
   */
  getUserNameFromHeader(): Observable<string> {
    return this.headerService.getDisplayedUser();
  }

  /**
   * Get the admin rights from the header
   */
  getAdminFromHeader(): Observable<boolean> {
    return this.headerService.isUserAdmin();
  }

  /**
   * Get the authenticated user's id from the token
   */
  getUserId(): string {
    if (this.isAuthenticated()) {
      const token: IToken = this.tokenService.decodeToken();
      if (token) {
        return String(token.sub);
      }
    }
    return null;
  }

  /**
   * Set the name from the token in the header
   */
  setUserNameInHeader(): Promise<any> {
    if (this.isAuthenticated()) {
      const token: IToken = this.tokenService.decodeToken();
      if (token) {
        this.headerService.setDisplayedUser(token.name);
      }
    }
    return new Promise(resolve => {
      resolve();
    });
  }

  /**
   * Get user's roles from the token
   */
  getUserRoles(): string[] {
    if (this.isAuthenticated()) {
      const token: IToken = this.tokenService.decodeToken();
      if (token) {
        return token.roles;
      }
    }
    return null;
  }
  /**
   * Set the admin rights in the header
   */
  setAdminDashboardInHeader(): Promise<any> {
    this.setAdmin();
    return new Promise(resolve => {
      resolve();
    });
  }

  /**
   * Is the user authenticated
   */
  isAuthenticated(): boolean {
    return !this.tokenService.isTokenExpired();
  }

  /**
   * Set the admin rights from the token
   */
  private setAdmin() {
    const userRoles = this.getUserRoles();
    if (userRoles) {
      const admin = userRoles.includes('Admin');
      this.headerService.setAdmin(admin);
    }
  }
}
