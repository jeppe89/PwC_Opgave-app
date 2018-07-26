import {Component, Inject} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
    selector: 'app-notification-snackbar',
    template: `
        {{ data }}
        <span class="fill-remaining-space"></span>
        <mat-icon class="app-green">check_circle</mat-icon>
    `,
    styles: [ '.fill-remaining-space { flex: 1 1 auto; }' ]
})
export class NotificationSnackbarComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
