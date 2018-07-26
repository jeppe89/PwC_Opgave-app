import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from './../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  registerSubscription: Subscription;
  loginSubscription: Subscription;
  fromEventId;
  alreadyAuthenticated = false;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService) {

    this.form = fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]],
      name: ['', [
        Validators.required
      ]],
      phone: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit(): void {
    this.alreadyAuthenticated = this.authService.isAuthenticated();
  }

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get name() { return this.form.get('name'); }
  get phone() { return this.form.get('phone'); }

  register(): void {
    if (this.form.invalid) {
      return;
    }
    // Register the user and login
    this.registerSubscription =
      this.userService.registerUser(this.form.value)
        .subscribe(res => {
          this.loginSubscription =
            this.authService.login(this.email.value, this.password.value,
              'event/' + (this.fromEventId ? this.fromEventId : ''));
        },
        error => console.log(error));
  }


}
