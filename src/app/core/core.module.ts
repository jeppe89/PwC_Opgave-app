import { EnsureHttpsInterceptor } from './services/ensure-https-interceptor.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

// Set locale data to danish
import localeDa from '@angular/common/locales/da';
registerLocaleData(localeDa);

import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from './material/material.module';
import { HttpErrorHandlerService } from './services/http-error-handler.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { TokenService } from './services/token.service';
import { HeaderService } from './services/header.service';
import { AuthGuardService } from './services/auth-guard.service';
import { NotificationService } from './services/notification.service';
import { AdminGuardService } from './services/admin-guard.service';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['pwc-testopgave-api.herokuapp.com']
      }
    }),
    CoreRoutingModule,
    MaterialModule,

  ],
  declarations: [HeaderComponent, LoginComponent, RegisterComponent],
  exports: [
    RouterModule,
    HeaderComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'da-DK' },
    HttpErrorHandlerService,
    AuthService,
    UserService,
    TokenService,
    HeaderService,
    NotificationService,
    AuthGuardService,
    AdminGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpsInterceptor, multi: true }
  ]
})
export class CoreModule { }
