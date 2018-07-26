import { Component, OnInit } from '@angular/core';

import { TableDataSource } from './../services/table.datasource';
import { EventService } from '../../event/services/event.service';

@Component({
  selector: 'app-admin-event-list',
  templateUrl: './admin-event-list.component.html',
  styleUrls: ['./admin-event-list.component.css']
})
export class AdminEventListComponent implements OnInit {
  displayColumns = ['id', 'name', 'subscriberCount'];
  dataSource = new TableDataSource(this.eventService);
  dataType = 'event';

  constructor(
    private eventService: EventService) { }

  ngOnInit() {
  }

}
