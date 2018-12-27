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

import * as stationsActions from "../actions/stations.actions";
import { FetchDataService } from "@app/core/fetch-data/fetch-data.service";
import { StationSensors } from "../models/stationsModels";
import { selectStationsEntireState } from "../selectors/stationsSelector";
import { AppState } from "@app/core/core.state";
import { of } from "rxjs";

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
        catchError(err => {
          of(new stationsActions.StationDataFetchFailure());
          throw err;
        })
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
        catchError(err => {
          of(new stationsActions.StationDataFetchFailure());
          throw err;
        })
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
    catchError(err => {
      of(new stationsActions.StationDataFetchFailure());
      throw err;
    })
  );

  @Effect()
  FetchSensorValues = this.actions$.pipe(
    ofType<stationsActions.SensorFetchValuesRequestAction>(
      stationsActions.SENSOR_FETCH_VALUES_REQUEST
    ),
    mergeMap(action =>
      this.fetchDataService.fetchSensorData(action.sensorId).pipe(
        map(
          sensorData =>
            new stationsActions.SensorFetchValuesSuccessAction({
              ...sensorData,
              sensorId: action.sensorId
            })
        ),
        catchError(err => {
          of(new stationsActions.StationDataFetchFailure());
          throw err;
        })
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
    catchError(err => {
      of(new stationsActions.StationDataFetchFailure());
      throw err;
    })
  );
}
