import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HandleError, HttpErrorHandlerService } from './../../core/services/http-error-handler.service';
import { Globals } from '../../globals';

@Injectable()
export class EventService {
  // url = this.globals.API_URL + '/events/';
  url = 'https://pwc-testopgave-api.herokuapp.com/api/events/';
  private handleError: HandleError;

  constructor(
    private httpClient: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService,
    private globals: Globals) {
      this.handleError = this.httpErrorHandler.createHandleError('EventService');
    }
  /**
   * Get all events
   */
  getEvents(): Observable<any> {
    return this.httpClient
      .get(this.url)
      .pipe(
        catchError(this.handleError('getEvents', []))
      );
  }
  /**
   * Get a specific event
   * @param id Event id
   */
  getEvent(id: string): Observable<any> {
    return this.httpClient
      .get(this.url + id)
      .pipe(
        catchError(this.handleError('getEvent', []))
      );
  }
  /**
   * Create an event
   * @param event Event data
   */
  createEvent(event: any): Observable<any> {
    // Set up the required request object
    const object = {
      data: {
        type: 'events',
        attributes: {
          name: event.name,
          description: event.description,
          date: event.date
        }
      }
    };

    return this.httpClient
      .post(this.url, object)
      .pipe(
        catchError(this.handleError('createEvent'))
      );
  }
  /**
   * Subscribe a specific user to a specific event
   * @param id The event's id
   * @param userId The user's id
   */
  subscribeToEvent(id: string, userId: string): Observable<any> {
    const object = {
      data: [
        {
          type: 'users',
          id: userId
        }
      ]
    };
    return this.httpClient
      .post(this.url + id + '/users', object)
      .pipe(
        catchError(this.handleError('registerForEvent', []))
      );
  }
  /**
   * Unsubscribe a specific user from a specific event
   * @param id The event's id
   * @param userId The user's id
   */
  unsubscribeFromEvent(id: string, userId: string): Observable<any> {
    const object = {
      data: [
        {
          type: 'users',
          id: userId
        }
      ]
    };
    return this.httpClient
      .request('delete', this.url + id + '/users',
      {
        body: object
      })
      .pipe(
        catchError(this.handleError('unsubscribeFromEvent'))
      );
  }
}
