import { Subscription } from 'rxjs';
import { EventService } from './../../event/services/event.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { TableDataSource } from './../services/table.datasource';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit, OnDestroy {

  @Input() dataType: string;
  @Input() dataSource: TableDataSource;
  @Input() columns: string[];
  expandedElement;
  relationships;
  subscription: Subscription;

  constructor() { }

  ngOnInit() {
    if (this.dataType === 'event') {
      // Load the events into the DataSource
      this.dataSource.loadEvents();

      // Load the relationship data (included on the API) into the public property
      this.subscription = this.dataSource.includedSubject.subscribe(included => {
        this.relationships = included;
      });
    }
    if (this.dataType === 'user') {
      // Not implemented
    }
  }
  /**
   * Find the relationship data for the specified Event Id
   * @param id Id of the Event
   */
  findRelationshipAttributes(id) {
    return this.relationships.find(el => el.id === id).attributes;
  }

  // Unsubscribe from all subscriptions when the component gets destroyed
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
