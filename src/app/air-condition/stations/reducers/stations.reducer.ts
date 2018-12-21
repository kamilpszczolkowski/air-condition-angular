import { StationsState } from "../models/stationsModels";

import * as Actions from "../actions/stations.actions";

const initialState: StationsState = {
  isFetching: false,
  stationName: "",
  stationId: -1,
  airQualityIndex: "",
  sensors: [],
  values: []
};

export function stationsReducer(
  state: StationsState = initialState,
  action: Actions.StationsActions
): StationsState {
  switch (action.type) {
    case Actions.SET_STATION_NAME:
      return {
        ...state,
        isFetching: true,
        stationName: action.payload.name,
        stationId: action.payload.id,
        values: []
      };
    case Actions.STATION_FETCH_AQI_SUCCESS:
      return { ...state, airQualityIndex: action.airQualityIndex };
    case Actions.STATION_FETCH_SENSORS_SUCCESS:
      return { ...state, sensors: action.stationSensors };
    case Actions.SENSOR_FETCH_VALUES_SUCCESS:
      return { ...state, values: [...state.values, action.sensorData] };
    default:
      return state;
  }
}
