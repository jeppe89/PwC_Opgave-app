import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html'
})
export class EventCreateComponent {

  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }

}
