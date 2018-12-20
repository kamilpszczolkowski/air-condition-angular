import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-stations-modal',
  templateUrl: './stations-modal.component.html',
  styleUrls: ['./stations-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StationsModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
