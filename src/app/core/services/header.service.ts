import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IToken } from './token.interface';
import { TokenService } from './token.service';

@Injectable()
export class HeaderService {
  username = new BehaviorSubject<string>('');
  admin = new BehaviorSubject<boolean>(false);

  constructor() {}

  setDisplayedUser(userName: string): void {
    this.username.next(userName);
  }

  removeDisplayedUser(): void {
    this.username.next(null);
  }

  getDisplayedUser(): Observable<string> {
    return this.username.asObservable();
  }

  setAdmin(isAdmin: boolean) {
    this.admin.next(isAdmin);
  }

  removeAdmin(): void {
    this.admin.next(false);
  }

  isUserAdmin(): Observable<boolean> {
    return this.admin.asObservable();
  }
}
