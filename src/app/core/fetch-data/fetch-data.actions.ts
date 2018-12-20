import { Action } from "@ngrx/store";
import { DataStation } from "./fetch-data.models";

export const DATA_REQUEST_STATIONS = "DATA_REQUEST_STATIONS";
export class DataRequestStationsAction implements Action {
  public readonly type = DATA_REQUEST_STATIONS;
}

export const DATA_REQUEST_STATIONS_SUCCESS = "DATA_REQUEST_STATIONS_SUCCESS";
export class DataRequestStationsSuccessAction implements Action {
  readonly type = DATA_REQUEST_STATIONS_SUCCESS;

  constructor(readonly payload: DataStation[]) {}
}

export const DATA_UPDATE_SEARCH_PHRASE_REQUEST =
  "DATA_UPDATE_SEARCH_PHRASE_REQUEST";
export class DataUpdateSearchPhraseRequestAction implements Action {
  readonly type = DATA_UPDATE_SEARCH_PHRASE_REQUEST;

  constructor(readonly payload: string) {}
}

export type DataActions =
  | DataRequestStationsAction
  | DataRequestStationsSuccessAction
  | DataUpdateSearchPhraseRequestAction;
