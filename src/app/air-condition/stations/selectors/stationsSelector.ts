import { createSelector } from "@ngrx/store";

import { selectStationsState } from "@app/core";
import { StationsState } from "../models/stationsModels";

export const selectStationsEntireState = createSelector(
  selectStationsState,
  (state: StationsState) => state
);

export const selectStationName = createSelector(
  selectStationsState,
  (state: StationsState) => state.stationName
);

export const selectSensors = createSelector(
  selectStationsState,
  (state: StationsState) => state.sensors
);

export const selectSensorsValues = createSelector(
  selectStationsState,
  (state: StationsState) => state.values
);

export const selectSensorsWithValues = createSelector(
  selectStationsState,
  (state: StationsState) =>
    state.sensors.map(sensor => ({
      param: sensor.param.paramName,
      measurements: state.values.filter(value => value.sensorId === sensor.id)
    }))
);

export const selectStationsFetchStatus = createSelector(
  selectStationsState,
  (state: StationsState) => state.isFetching
);

export const selectAirQualityIndex = createSelector(
  selectStationsState,
  (state: StationsState) => state.airQualityIndex
);
