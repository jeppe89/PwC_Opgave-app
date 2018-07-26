import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { IToken } from './token.interface';

@Injectable()
export class TokenService {
  tokenKey = 'access_token';

  constructor(private jwtHelperService: JwtHelperService) { }

  isTokenExpired(): boolean {
    return this.jwtHelperService.isTokenExpired();
  }

  decodeToken(): IToken {
    return this.jwtHelperService.decodeToken();
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  getTokenExpirationDate(): Date {
    return this.jwtHelperService.getTokenExpirationDate();
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }
}
