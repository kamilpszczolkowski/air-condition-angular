import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import * as stationsActions from "../actions/stations.actions";
import { mergeMap, map } from "rxjs/operators";
import { FetchDataService } from "@app/core/fetch-data/fetch-data.service";
import { StationSensors } from "../models/stationsModels";

@Injectable()
export class StationsEffects {
  constructor(
    private actions$: Actions<Action>,
    private fetchDataService: FetchDataService
  ) {}

  @Effect()
  FetchAirQualityIndex = this.actions$.pipe(
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

  @Effect()
  FetchStationsSensors = this.actions$.pipe(
    ofType<stationsActions.SetStationNameAction>(
      stationsActions.SET_STATION_NAME
    ),
    mergeMap(action =>
      this.fetchDataService
        .fetchStationSensors(action.payload.id)
        .pipe(
          map(
            stationSensors =>
              new stationsActions.StationFetchSensorsSuccessAction(
                stationSensors
              )
          )
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
    )
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
        )
      )
    )
  );
}
