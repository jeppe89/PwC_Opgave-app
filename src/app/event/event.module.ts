import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { EventRoutingModule } from './event-routing.module';
import { MaterialModule } from '../core/material/material.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventComponent } from './event.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventService } from './services/event.service';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventFormComponent } from './event-form/event-form.component';


@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EventComponent,
    EventListComponent,
    EventCardComponent,
    EventDetailComponent,
    EventCreateComponent,
    EventFormComponent,
  ],
  providers: [
    EventService
  ]
})
export class EventModule { }
