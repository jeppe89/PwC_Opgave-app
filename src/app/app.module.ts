import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { NotificationSnackbarComponent } from './notification-snackbar.component';


@NgModule({
  declarations: [
    AppComponent,
    NotificationSnackbarComponent,
  ],
  imports: [
    CoreModule,
    NgHttpLoaderModule,
    MatIconModule
  ],
  providers: [],
  entryComponents: [
    NotificationSnackbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
