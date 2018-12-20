import { DataState } from "./fetch-data.models";
import { DataActions } from "./fetch-data.actions";
import * as Actions from "./fetch-data.actions";

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
    case Actions.DATA_REQUEST_STATIONS:
      return { ...state, isFetching: true };
    case Actions.DATA_REQUEST_STATIONS_SUCCESS:
      return { ...state, stationsList: action.payload, isFetching: false };
    case Actions.DATA_UPDATE_SEARCH_PHRASE_REQUEST:
      return { ...state, searchPhrase: action.payload };
    default:
      return state;
  }
}
