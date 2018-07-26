import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

import { EventService } from './../../event/services/event.service';

export class TableDataSource extends DataSource<any> {
    private dataSubject = new BehaviorSubject<any>([]);
    public includedSubject = new BehaviorSubject<any>([]);

    constructor(
        private eventService: EventService) {
            super();
        }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
    }

    /**
     * Gets the events from the API and add its values to the BehaviourSubjects
     */
    loadEvents(): void {
        this.eventService.getEvents().subscribe(
            events => {
                this.dataSubject.next(events.data);
                this.includedSubject.next(events.included);
            }
        );
    }
}
