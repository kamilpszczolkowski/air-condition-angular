import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";

import {
  selectIsFetching,
  selectstationsList
} from "app/core/fetch-data/fetch-data.selectors";
import { FetchStationsRequest } from "app/core/fetch-data/fetch-data.actions";
import { StationDataFetchRequestAction } from "app/air-condition/actions/stations.actions";
import { AppState } from "app/core/core.state";
import { googleMapsStyle } from "app/air-condition/helpers/mapsStyles";

@Component({
  selector: "anms-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  lat = 52.182189;
  lng = 19.353091;
  zoom = 6.7;

  markerIcon = {
    url: require("assets/marker.png"),
    scaledSize: {
      height: 25,
      width: 25
    }
  };

  styleArray = googleMapsStyle;
  isFetching$ = this.store.select(selectIsFetching);
  stationsList = this.store.select(selectstationsList);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new FetchStationsRequest());
  }

  handleMarkerClick(stationName: string, stationId: number): void {
    this.store.dispatch(
      new StationDataFetchRequestAction({ name: stationName, id: stationId })
    );
  }
}
