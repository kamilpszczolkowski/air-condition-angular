import { createSelector } from "@ngrx/store";

import { selectStationsState } from "@app/core";
import { StationsState } from "../models/stationsModels";

export const selectStationName = createSelector(
  selectStationsState,
  (state: StationsState) => state.stationName
);
