import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store, select } from "@ngrx/store";

import * as stationsActions from "../actions/stations.actions";
import { mergeMap, map, withLatestFrom } from "rxjs/operators";
import { FetchDataService } from "@app/core/fetch-data/fetch-data.service";
import { StationSensors } from "../models/stationsModels";
import { AppState } from "@app/core";
import { selectStationsEntireState } from "../selectors/stationsSelector";

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
    ofType<stationsActions.StationDataFetchRequestAction>(
      stationsActions.STATION_DATA_FETCH_REQUEST
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

  @Effect()
  StationDataFechSuccess = this.actions$.pipe(
    ofType<stationsActions.SensorFetchValuesSuccessAction>(
      stationsActions.SENSOR_FETCH_VALUES_SUCCESS
    ),
    withLatestFrom(this.store.pipe(select(selectStationsEntireState))),
    map(([action, stationsState]) => {
      if (
        stationsState.values.length > 0 &&
        stationsState.values.length === stationsState.sensors.length
      ) {
        return new stationsActions.StationDataFetchSuccess();
      }
      return new stationsActions.StationDataFetchContinue();
    })
  );
}
