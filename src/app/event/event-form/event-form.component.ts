import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { EventService } from '../services/event.service';
import { NotificationService } from './../../core/services/notification.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnDestroy {
  form: FormGroup;
  subscription: Subscription;
  @Input() event;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private eventService: EventService,
    private notificationService: NotificationService,
    private router: Router) {
      this.form = fb.group({
        name: ['', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)
        ]],
        description: ['', [
          Validators.required,
          Validators.maxLength(255)
        ]],
        date: ['', [
          Validators.required,
        ]]
      });
    }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  /**
   * If event data is provided set the data in the form
   */
  setFormValues(): void {
    if (this.event) {
      this.form.setValue({
        name: this.event.attributes.name,
        description: this.event.attributes.description,
        date: this.event.attributes.date
      });
    }
  }
  /**
   * Submitting the form
   */
  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.subscription =
      this.eventService.createEvent(this.form.value)
        .subscribe(res => {
          // Navigate to the admin dashboard
          this.router.navigate(['admin']);
          // Notify that the event is created
          this.notificationService.notificationSubject.next('Arrangement oprettet');
        },
        error => console.log(error));
  }

  get name() { return this.form.get('name'); }
  get description() { return this.form.get('description'); }
  get date() { return this.form.get('date'); }

}
