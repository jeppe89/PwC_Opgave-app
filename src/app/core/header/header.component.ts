import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username$: Observable<string>;
  admin$: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Add the authenticated user's name to the header
    this.authService.setUserNameInHeader()
      .then(res => this.username$ = this.authService.getUserNameFromHeader());
    // If the authenticated user is admin, display the Admin Dashboard in the header
    this.authService.setAdminDashboardInHeader()
      .then(res => this.admin$ = this.authService.getAdminFromHeader());
  }
  /**
   * Log the user out and redirect to event-list page
   */
  logout(): void {
    this.authService.logout('event');
  }

}
