import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector
} from "@ngrx/store";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { storeFreeze } from "ngrx-store-freeze";

import { environment } from "environments/environment";
import { initStateFromLocalStorage } from "app/core/meta-reducers/init-state-from-local-storage.reducer";
import { dataReducer } from "app/core/fetch-data/fetch-data.reducer";
import { RouterStateUrl } from "app/core/router/router.state";
import { DataState } from "app/core/fetch-data/fetch-data.models";
import { stationsReducer } from "app/air-condition/reducers/stations.reducer";
import { StationsState } from "app/air-condition/models/stationsModels";

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  data: dataReducer,
  stations: stationsReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage
];
if (!environment.production) {
  metaReducers.unshift(storeFreeze);
}

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>("router");

export const selectDataState = createFeatureSelector<AppState, DataState>(
  "data"
);

export const selectStationsState = createFeatureSelector<
  AppState,
  StationsState
>("stations");

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  data: DataState;
  stations: StationsState;
}
