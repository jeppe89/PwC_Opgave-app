import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { EventService } from '../services/event.service';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
})
export class EventDetailComponent implements OnInit, OnDestroy {

  eventSub: Subscription;
  event: any;
  errorMessage: any;
  eventRegistered = false;
  userId: string;
  subscribers;
  hoverButton = false;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.getEvent();
  }

  ngOnDestroy(): void {
    this.eventSub.unsubscribe();
  }
  /**
   * Get the Event data
   */
  getEvent() {
    // Get the id from the URL
    const eventId = this.route.snapshot.paramMap.get('id');
    this.eventSub =
      this.eventService
        .getEvent(eventId)
        .subscribe(
          event => {
            this.event = event.data;
            this.eventRegistered = this.isEventRegistered();
            this.subscribers = this.event.relationships.users.data;
          },
          error => this.errorMessage = error
        );
  }

  goBack(): void {
    this.location.back();
  }
  /**
   * Check if the authenticated user is subscribed to the event
   */
  isEventRegistered(): boolean {
    if (this.event.relationships.users.data.find(x => x.id === this.userId)) {
      return true;
    }
    return false;
  }

  /**
   * Subscribe to the event
   */
  subscribeToEvent(): void {
    if (this.authService.isAuthenticated()) {
      this.eventSub =
        this.eventService.subscribeToEvent(this.event.id, this.userId).subscribe(
          message => {
            // Notify the user that he subscribed to the event
            this.notificationService.notificationSubject.next('Du er nu tilmeldt dette arrangement');
            this.eventRegistered = true;
            this.subscribers.length += 1;
          },
          error => {
            console.log(error);
          });
    } else {
      this.router.navigate(['/login'], { queryParams: { fromEvent: this.event.id }});
    }
  }
  /**
   * Unsubscribe from the event
   */
  unsubscribeFromEvent(): void {
    this.eventSub =
      this.eventService.unsubscribeFromEvent(this.event.id, this.userId).subscribe(
        () => {
          // Notify the user that he is unsubscribed from the event
          this.notificationService.notificationSubject.next('Du er nu afmeldt dette arrangement');
          this.eventRegistered = false;
          this.subscribers.length -= 1;
        },
        error => console.log(error)
      );
  }

}
