import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { EventService } from '../services/event.service';
import { AuthService } from './../../core/services/auth.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {

  eventSub: Subscription;
  events: any;
  errorMessage: any;
  userId;
  test;

  constructor(
    private eventService: EventService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getEvents();
    this.userId = this.authService.getUserId();
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.eventSub.unsubscribe();
  }
  /**
   * Get all the events
   */
  getEvents() {
    this.eventSub = this.eventService.getEvents().subscribe(
      events => {
        this.events = events.data;
      },
      error => this.errorMessage = error
    );
  }
  /**
   * Check if the authenticated user is subscribed to the provided event
   * @param event Event data
   */
  isEventSubscribed(event): boolean {
    if (event.relationships.users.data.find(user => user.id === this.userId)) {
      return true;
    }
    return false;
  }

}
