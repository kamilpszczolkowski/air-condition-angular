import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { FetchStationsRequest } from "./fetch-data.actions";
import * as dataActions from "./fetch-data.actions";
import { map, mergeMap, catchError } from "rxjs/operators";
import { FetchDataService } from "./fetch-data.service";
import { of } from "rxjs";

@Injectable()
export class DataEffects {
  constructor(
    private actions$: Actions<Action>,
    private fetchDataService: FetchDataService
  ) {}
  DataUpdateSearchPhraseRequestAction;
  @Effect()
  FetchStationsData = this.actions$.pipe(
    ofType<FetchStationsRequest>(dataActions.FETCH_STATIONS_REQUEST),
    mergeMap(() =>
      this.fetchDataService.fetchStationsData().pipe(
        map(dataStations => new dataActions.FetchStationsSuccess(dataStations)),
        catchError(err => {
          of(new dataActions.FetchStationsFailure());
          throw err;
        })
      )
    )
  );
}
