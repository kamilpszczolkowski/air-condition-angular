import { createSelector } from '@ngrx/store';
import { selectDataState } from '../core.state';
import { DataState } from './fetch-data.models';

export const selectData = createSelector(
    selectDataState,
    (state: DataState) => state
)

export const selectIsFetching = createSelector(
    selectDataState,
    (state: DataState) => state.isFetching
)

export const selectstationsList = createSelector(
    selectDataState,
    (state: DataState) => state.stationsList
)
