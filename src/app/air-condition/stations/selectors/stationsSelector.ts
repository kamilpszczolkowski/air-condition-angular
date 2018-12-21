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
