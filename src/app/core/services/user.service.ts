import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandlerService, HandleError } from './http-error-handler.service';
import { Globals } from './../../globals';

@Injectable()
export class UserService {
  url = this.global.API_URL + '/users/';
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService,
    private global: Globals) {
      this.handleError = this.httpErrorHandler.createHandleError('UserService');
    }
  /**
   * Register the user
   * @param user User data
   */
  registerUser(user: any): Observable<any> {
    // Set up the request object
    const object = {
      data: {
        type: 'users',
        attributes: {
          name: user.name,
          email: user.email,
          password: user.password,
          phone: user.phone
        }
      }
    };
    return this.httpClient
      .post(this.url + 'register', object)
      .pipe(
        catchError(this.handleError('registerUser'))
      );
  }
}
