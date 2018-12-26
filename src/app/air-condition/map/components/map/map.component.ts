import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  AppState,
  DataRequestStationsAction,
  selectIsFetching,
  selectstationsList
} from "@app/core";

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

  isFetching$ = this.store.select(selectIsFetching);
  stationsList = this.store.select(selectstationsList);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new DataRequestStationsAction());
  }
}
