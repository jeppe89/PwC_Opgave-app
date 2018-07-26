import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../core/material/material.module';
import { EventModule } from '../event/event.module';
import { AdminComponent } from './admin.component';
import { AdminEventListComponent } from './admin-event-list/admin-event-list.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    EventModule
  ],
  declarations: [
    AdminComponent,
    AdminEventListComponent,
    TableComponent,
  ]
})
export class AdminModule { }
