import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { NotificationSnackbarComponent } from './notification-snackbar.component';
import { Globals } from './globals';

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
  providers: [
    Globals
  ],
  entryComponents: [
    NotificationSnackbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
