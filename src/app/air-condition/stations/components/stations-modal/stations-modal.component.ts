import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";

import { AppState } from "@app/core";
import {
  selectStationName,
  selectStationsFetchStatus,
  selectAirQualityIndex,
  selectSensors
} from "../../selectors/stationsSelector";

@Component({
  selector: "anms-stations-modal",
  templateUrl: "./stations-modal.component.html",
  styleUrls: ["./stations-modal.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StationsModalComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  stationName$ = this.store.select(selectStationName);
  isFetching = this.store.select(selectStationsFetchStatus);
  airQualityIndex = this.store.select(selectAirQualityIndex);
  sensors = this.store.select(selectSensors);

  ngOnInit() {}
}
