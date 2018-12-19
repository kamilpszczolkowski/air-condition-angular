import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, DataRequestStationsAction, selectIsFetching } from '@app/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'anms-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StationsComponent implements OnInit {

  public isFetching: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new DataRequestStationsAction());

    this.isFetching = this.store.pipe(select(selectIsFetching));
  }

}
