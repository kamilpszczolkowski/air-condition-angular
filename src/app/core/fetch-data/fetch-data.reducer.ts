import { DataState } from "app/core/fetch-data/fetch-data.models";
import { DataActions } from "app/core/fetch-data/fetch-data.actions";
import * as Actions from "app/core/fetch-data/fetch-data.actions";

const initialState: DataState = {
  isFetching: false,
  stationsList: [],
  searchPhrase: ""
};

export function dataReducer(
  state: DataState = initialState,
  action: DataActions
): DataState {
  switch (action.type) {
    case Actions.FETCH_STATIONS_REQUEST:
      return { ...state, isFetching: true };
    case Actions.FETCH_STATIONS_SUCCESS:
      return { ...state, stationsList: action.payload, isFetching: false };
    case Actions.FETCH_STATIONS_FAILURE:
      return { ...state, isFetching: false };
    case Actions.UPDATE_SEARCH_PHRASE_REQUEST:
      return { ...state, searchPhrase: action.payload };
    default:
      return state;
  }
}
