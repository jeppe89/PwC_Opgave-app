import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSnackBarModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTableModule
  ]
})
export class MaterialModule { }
