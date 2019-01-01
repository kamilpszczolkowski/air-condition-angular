import { createSelector } from "@ngrx/store";

import { selectDataState } from "app/core/core.state";
import { DataState } from "app/core/fetch-data/fetch-data.models";

export const selectData = createSelector(
  selectDataState,
  (state: DataState) => state
);

export const selectIsFetching = createSelector(
  selectDataState,
  (state: DataState) => state.isFetching
);

export const selectstationsList = createSelector(
  selectDataState,
  (state: DataState) => state.stationsList
);

export const selectDataSource = createSelector(
  selectDataState,
  ({ stationsList, searchPhrase }: DataState) =>
    stationsList
      .map(({ id, city, addressStreet }) => ({
        id,
        stationName: city.name,
        addressStreet
      }))
      .filter(({ stationName }) =>
        stationName.toLowerCase().includes(searchPhrase.toLowerCase())
      )
);

export const selectSearchPhrase = createSelector(
  selectDataState,
  (state: DataState) => state.searchPhrase
);
