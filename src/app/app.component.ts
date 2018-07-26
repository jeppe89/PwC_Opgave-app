import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { NotificationSnackbarComponent } from './notification-snackbar.component';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar) {
      this.notificationService.notification$.subscribe(message => {
        // If a new message is added to the notification service, display it in the SnackBar component
        if (message) {
          this.snackBar.openFromComponent(NotificationSnackbarComponent, {
              data: message,
              duration: 5000
          });
        }
      });
  }
}
