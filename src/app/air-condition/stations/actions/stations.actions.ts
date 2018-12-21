import { Action } from "@ngrx/store";

export const STATION_DATA_FETCH_SUCCESS = "STATION_DATA_FETCH_SUCCESS";
export class StationDataFetchSuccess implements Action {
  public readonly type = STATION_DATA_FETCH_SUCCESS;
}

export const SET_STATION_NAME = "SET_STATION_NAME";
export class SetStationNameAction implements Action {
  public readonly type = SET_STATION_NAME;

  constructor(readonly payload: {name: string, id: number}) {}
}

export const STATION_FETCH_AQI_SUCCESS = "STATION_FETCH_AQI_SUCCESS";
export class StationFetchAqiSuccessAction implements Action {
  readonly type = STATION_FETCH_AQI_SUCCESS;

  constructor(readonly airQualityIndex: string) {}
}

export type StationsActions =
  | StationDataFetchSuccess
  | SetStationNameAction
  | StationFetchAqiSuccessAction;
