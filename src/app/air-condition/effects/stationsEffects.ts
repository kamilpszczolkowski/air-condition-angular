import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store, select } from "@ngrx/store";
import {
  mergeMap,
  map,
  withLatestFrom,
  filter,
  catchError
} from "rxjs/operators";
import { of } from "rxjs";

import { FetchDataService } from "app/core/fetch-data/fetch-data.service";
import { StationSensors } from "app/air-condition/models/stationsModels";
import { selectStationsEntireState } from "app/air-condition/selectors/stationsSelector";
import { AppState } from "app/core/core.state";
import * as stationsActions from "app/air-condition/actions/stations.actions";

@Injectable()
export class StationsEffects {
  constructor(
    private actions$: Actions<Action>,
    private fetchDataService: FetchDataService,
    private store: Store<AppState>
  ) {}

  @Effect()
  FetchAirQualityIndex = this.actions$.pipe(
    ofType<stationsActions.StationDataFetchRequestAction>(
      stationsActions.STATION_DATA_FETCH_REQUEST
    ),
    mergeMap(action =>
      this.fetchDataService.fetchStationAQI(action.payload.id).pipe(
        map(
          aqi =>
            new stationsActions.StationFetchAqiSuccessAction(
              aqi.stIndexLevel.indexLevelName
            )
        ),
        catchError(() => [of(new stationsActions.StationDataFetchFailure())])
      )
    )
  );

  @Effect()
  FetchStationsSensors = this.actions$.pipe(
    ofType<stationsActions.StationDataFetchRequestAction>(
      stationsActions.STATION_DATA_FETCH_REQUEST
    ),
    mergeMap(action =>
      this.fetchDataService.fetchStationSensors(action.payload.id).pipe(
        map(
          stationSensors =>
            new stationsActions.StationFetchSensorsSuccessAction(stationSensors)
        ),
        catchError(() => [of(new stationsActions.StationDataFetchFailure())])
      )
    )
  );

  @Effect()
  FetchSensorsValuesRequest = this.actions$.pipe(
    ofType<stationsActions.StationFetchSensorsSuccessAction>(
      stationsActions.STATION_FETCH_SENSORS_SUCCESS
    ),
    mergeMap(action =>
      action.stationSensors.map(
        (sensor: StationSensors) =>
          new stationsActions.SensorFetchValuesRequestAction(sensor.id)
      )
    ),
    catchError(() => [of(new stationsActions.StationDataFetchFailure())])
  );

  @Effect()
  FetchSensorValues = this.actions$.pipe(
    ofType<stationsActions.SensorFetchValuesRequestAction>(
      stationsActions.SENSOR_FETCH_VALUES_REQUEST
    ),
    mergeMap(({ sensorId }) =>
      this.fetchDataService.fetchSensorData(sensorId).pipe(
        map(
          sensorData =>
            new stationsActions.SensorFetchValuesSuccessAction({
              ...sensorData,
              sensorId
            })
        ),
        catchError(() => [of(new stationsActions.StationDataFetchFailure())])
      )
    )
  );

  @Effect()
  StationDataFechSuccess = this.actions$.pipe(
    ofType<stationsActions.SensorFetchValuesSuccessAction>(
      stationsActions.SENSOR_FETCH_VALUES_SUCCESS
    ),
    withLatestFrom(this.store.pipe(select(selectStationsEntireState))),
    filter(
      ([action, stationsState]) =>
        stationsState.values.length > 0 &&
        stationsState.values.length === stationsState.sensors.length
    ),
    map(() => new stationsActions.StationDataFetchSuccess()),
    catchError(() => [of(new stationsActions.StationDataFetchFailure())])
  );
}
