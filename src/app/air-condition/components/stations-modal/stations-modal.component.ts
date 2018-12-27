import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";

import {
  selectStationName,
  selectStationsFetchStatus,
  selectAirQualityIndex,
  selectSensorsWithMeasurements
} from "../../selectors/stationsSelector";
import { AppState } from "@app/core/core.state";

@Component({
  selector: "anms-stations-modal",
  templateUrl: "./stations-modal.component.html",
  styleUrls: ["./stations-modal.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StationsModalComponent implements OnInit {
  public AQIColors = {
    "Bardzo dobry": "green",
    Dobry: "yellowgreen",
    Umiarkowany: "brown"
  };

  constructor(private store: Store<AppState>) {}

  stationName$ = this.store.select(selectStationName);
  isFetching = this.store.select(selectStationsFetchStatus);
  airQualityIndex = this.store.select(selectAirQualityIndex);
  sensors = this.store.select(selectSensorsWithMeasurements);

  ngOnInit() {}
}
