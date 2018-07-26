import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    const userRoles = this.authService.getUserRoles();
    if (userRoles) {
      const admin = userRoles.includes('Admin');
      if (!admin) {
        this.router.navigate(['/']);
        return false;
      }
    }
    return true;
  }
}
