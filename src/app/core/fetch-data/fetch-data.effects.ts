import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { map, mergeMap, catchError } from "rxjs/operators";
import { of } from "rxjs";

import * as dataActions from "app/core/fetch-data/fetch-data.actions";
import { FetchDataService } from "app/core/fetch-data/fetch-data.service";

@Injectable()
export class DataEffects {
  constructor(
    private actions$: Actions<Action>,
    private fetchDataService: FetchDataService
  ) {}
  DataUpdateSearchPhraseRequestAction;
  @Effect()
  FetchStationsData = this.actions$.pipe(
    ofType<dataActions.FetchStationsRequest>(
      dataActions.FETCH_STATIONS_REQUEST
    ),
    mergeMap(() =>
      this.fetchDataService.fetchStationsData().pipe(
        map(dataStations => new dataActions.FetchStationsSuccess(dataStations)),
        catchError(err => [of(new dataActions.FetchStationsFailure())])
      )
    )
  );
}
