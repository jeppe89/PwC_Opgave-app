import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  errorMessage;
  subscription: Subscription;
  fromEventId;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService) {

    this.form = fb.group({
      email: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit() {
    // Subscribe to the url parameters and save the id
    this.subscription = this.route.queryParams.subscribe(
      params => {
        this.fromEventId = params.fromEvent;
      }
    );
  }

  ngOnDestroy() {
    // Unsubscribe from alle subscriptions
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  /**
   * Submit the form, log the user in and redirect to the provided URL
   */
  login() {
    if (this.form.invalid) {
      return;
    }
    this.subscription =
      this.authService.login(this.email.value, this.password.value,
        'event/' + (this.fromEventId ? this.fromEventId : ''));
  }

}
