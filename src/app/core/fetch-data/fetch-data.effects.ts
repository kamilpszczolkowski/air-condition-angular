import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { DataRequestStationsAction } from './fetch-data.actions';
import * as dataActions from './fetch-data.actions';
import { map, mergeMap } from 'rxjs/operators';
import { FetchDataService } from './fetch-data.service';

@Injectable()
export class DataEffects {
    constructor(
        private actions$: Actions<Action>,
        private fetchDataService: FetchDataService,
    ) {}

    @Effect()
    FetchStationsData = this.actions$.pipe(
        ofType<DataRequestStationsAction>(dataActions.DATA_REQUEST_STATIONS),
        mergeMap(() => 
            this.fetchDataService.fetchStationsData().pipe(
            map( dataStations =>  new dataActions.DataRequestStationsSuccessAction(dataStations))
            ),
        ),
    )
}
