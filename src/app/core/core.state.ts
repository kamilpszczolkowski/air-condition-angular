import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector
} from "@ngrx/store";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { storeFreeze } from "ngrx-store-freeze";

import { environment } from "@env/environment";

import { initStateFromLocalStorage } from "./meta-reducers/init-state-from-local-storage.reducer";
import { AuthState } from "./auth/auth.models";
import { authReducer } from "./auth/auth.reducer";
import { dataReducer } from "./fetch-data/fetch-data.reducer";
import { RouterStateUrl } from "./router/router.state";
import { DataState } from "./fetch-data/fetch-data.models";
import { stationsReducer } from "@app/air-condition/reducers/stations.reducer";
import { StationsState } from "@app/air-condition/models/stationsModels";

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
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

export const selectAuthState = createFeatureSelector<AppState, AuthState>(
  "auth"
);

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
  auth: AuthState;
  router: RouterReducerState<RouterStateUrl>;
  data: DataState;
  stations: StationsState;
}
