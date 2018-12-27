import { Action } from "@ngrx/store";

import {
  StationSensors,
  SensorMeasurementsWithId
} from "../models/stationsModels";

export const STATION_DATA_FETCH_REQUEST = "STATION_DATA_FETCH_REQUEST";
export class StationDataFetchRequestAction implements Action {
  public readonly type = STATION_DATA_FETCH_REQUEST;

  constructor(readonly payload: { name: string; id: number }) {}
}

export const STATION_DATA_FETCH_SUCCESS = "STATION_DATA_FETCH_SUCCESS";
export class StationDataFetchSuccess implements Action {
  public readonly type = STATION_DATA_FETCH_SUCCESS;
}

export const STATION_DATA_FETCH_FAILURE = "STATION_DATA_FETCH_FAILURE";
export class StationDataFetchFailure implements Action {
  public readonly type = STATION_DATA_FETCH_FAILURE;
}

export const STATION_FETCH_AQI_SUCCESS = "STATION_FETCH_AQI_SUCCESS";
export class StationFetchAqiSuccessAction implements Action {
  readonly type = STATION_FETCH_AQI_SUCCESS;

  constructor(readonly airQualityIndex: string) {}
}

export const STATION_FETCH_SENSORS_SUCCESS = "STATION_FETCH_SENSORS_SUCCESS";
export class StationFetchSensorsSuccessAction implements Action {
  readonly type = STATION_FETCH_SENSORS_SUCCESS;

  constructor(readonly stationSensors: StationSensors[]) {}
}

export const SENSOR_FETCH_VALUES_REQUEST = "SENSOR_FETCH_VALUES_REQUEST";
export class SensorFetchValuesRequestAction implements Action {
  readonly type = SENSOR_FETCH_VALUES_REQUEST;

  constructor(readonly sensorId: number) {}
}

export const SENSOR_FETCH_VALUES_SUCCESS = "SENSOR_FETCH_VALUES_SUCCESS";
export class SensorFetchValuesSuccessAction implements Action {
  readonly type = SENSOR_FETCH_VALUES_SUCCESS;

  constructor(readonly sensorData: SensorMeasurementsWithId) {}
}

export type StationsActions =
  | StationDataFetchSuccess
  | StationDataFetchRequestAction
  | StationFetchAqiSuccessAction
  | StationFetchSensorsSuccessAction
  | SensorFetchValuesRequestAction
  | SensorFetchValuesSuccessAction
  | StationDataFetchFailure;
