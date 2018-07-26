import { AdminEventListComponent } from './admin-event-list/admin-event-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuardService } from './../core/services/admin-guard.service';
import { AuthGuardService } from './../core/services/auth-guard.service';
import { AdminComponent } from './admin.component';
import { EventCreateComponent } from '../event/event-create/event-create.component';

const routes: Routes = [
  { path: '', component: AdminComponent, canActivate: [AuthGuardService, AdminGuardService]  },
  { path: 'event', component: AdminEventListComponent, canActivate: [AuthGuardService, AdminGuardService] },
  { path: 'event/create', component: EventCreateComponent, canActivate: [AuthGuardService, AdminGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
