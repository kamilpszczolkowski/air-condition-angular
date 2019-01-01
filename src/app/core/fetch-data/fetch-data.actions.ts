import { Action } from "@ngrx/store";
import { DataStation } from "app/core/fetch-data/fetch-data.models";

export const FETCH_STATIONS_REQUEST = "FETCH_STATIONS_REQUEST";
export class FetchStationsRequest implements Action {
  public readonly type = FETCH_STATIONS_REQUEST;
}

export const FETCH_STATIONS_SUCCESS = "FETCH_STATIONS_SUCCESS";
export class FetchStationsSuccess implements Action {
  public readonly type = FETCH_STATIONS_SUCCESS;

  constructor(readonly payload: DataStation[]) {}
}

export const FETCH_STATIONS_FAILURE = "FETCH_STATIONS_FAILURE";
export class FetchStationsFailure implements Action {
  public readonly type = FETCH_STATIONS_FAILURE;
}

export const UPDATE_SEARCH_PHRASE_REQUEST = "UPDATE_SEARCH_PHRASE_REQUEST";
export class UpdateSearchPhraseRequest implements Action {
  public readonly type = UPDATE_SEARCH_PHRASE_REQUEST;

  constructor(readonly payload: string) {}
}

export type DataActions =
  | FetchStationsRequest
  | FetchStationsSuccess
  | FetchStationsFailure
  | UpdateSearchPhraseRequest;
