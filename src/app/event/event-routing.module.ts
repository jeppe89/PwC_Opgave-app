import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventComponent } from './event.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

const routes: Routes = [
  { path: '', component: EventComponent },
  { path: ':id', component: EventDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
