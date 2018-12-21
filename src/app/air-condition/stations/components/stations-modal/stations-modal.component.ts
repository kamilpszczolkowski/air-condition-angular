import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";

import { AppState } from "@app/core";
import { selectStationName } from "../../selectors/stationsSelector";

@Component({
  selector: "anms-stations-modal",
  templateUrl: "./stations-modal.component.html",
  styleUrls: ["./stations-modal.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StationsModalComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  stationName$ = this.store.select(selectStationName);

  ngOnInit() {}
}
