import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import * as stationsActions from "../actions/stations.actions";
import { mergeMap, map } from "rxjs/operators";
import { FetchDataService } from "@app/core/fetch-data/fetch-data.service";

@Injectable()
export class StationsEffects {
  constructor(
    private actions$: Actions<Action>,
    private fetchDataService: FetchDataService
  ) {}

  @Effect()
  RequestStationData = this.actions$.pipe(
    ofType<stationsActions.SetStationNameAction>(
      stationsActions.SET_STATION_NAME
    ),
    mergeMap(action =>
      this.fetchDataService
        .fetchStationAQI(action.payload.id)
        .pipe(
          map(
            aqi =>
              new stationsActions.StationFetchAqiSuccessAction(
                aqi.stIndexLevel.indexLevelName
              )
          )
        )
    )
  );
}
