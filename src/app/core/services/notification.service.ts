import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NotificationService {
  public notificationSubject = new BehaviorSubject<string>(null);

  public notification$ = this.notificationSubject.asObservable();

  constructor() { }
}
