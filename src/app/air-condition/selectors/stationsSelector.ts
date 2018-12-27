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

export const selectSensorsWithMeasurements = createSelector(
  selectStationsState,
  (state: StationsState) =>
    state.sensors.map(sensor => {
      let measuredVal = -1;
      const valuesForStation = state.values.filter(
        value => value.sensorId === sensor.id
      )[0];
      if (valuesForStation !== undefined) {
        valuesForStation.values.forEach(element => {
          if (
            measuredVal === -1 &&
            element.value !== undefined &&
            element.value !== null
          ) {
            measuredVal = element.value;
          }
        });
      }
      return {
        param: sensor.param.paramName,
        measuredVal
      };
    })
);

export const selectStationsFetchStatus = createSelector(
  selectStationsState,
  (state: StationsState) => state.isFetching
);

export const selectAirQualityIndex = createSelector(
  selectStationsState,
  (state: StationsState) => state.airQualityIndex
);
