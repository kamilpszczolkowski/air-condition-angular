import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { Store } from "@ngrx/store";
import {
  MatPaginator,
  MatTableDataSource,
  MatDialog,
  MatSort
} from "@angular/material";
import { FormGroup, FormBuilder } from "@angular/forms";

import { StationsModalComponent } from "app/air-condition/components/stations-modal/stations-modal.component";
import { StationListTable } from "app/core/fetch-data/fetch-data.models";
import { StationDataFetchRequestAction } from "app/air-condition/actions/stations.actions";
import {
  selectIsFetching,
  selectDataSource,
  selectSearchPhrase
} from "app/core/fetch-data/fetch-data.selectors";
import { AppState } from "app/core/core.state";
import {
  FetchStationsRequest,
  UpdateSearchPhraseRequest
} from "app/core/fetch-data/fetch-data.actions";
import { Subscription } from "rxjs";

@Component({
  selector: "anms-stations",
  templateUrl: "./stations.component.html",
  styleUrls: ["./stations.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StationsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["stationName", "address"];
  dataSource: MatTableDataSource<StationListTable>;
  searchForm: FormGroup;
  isFetching$ = this.store.select(selectIsFetching);
  dataSourceSubscription: Subscription;
  searchPhraseSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new FetchStationsRequest());
    this.dataSourceSubscription = this.store
      .select(selectDataSource)
      .subscribe(list => {
        this.dataSource = new MatTableDataSource<StationListTable>(list);
        this.dataSource.paginator = this.paginator;
        setTimeout(() => (this.dataSource.sort = this.sort));
      });

    this.searchForm = this.builder.group({
      searchInput: this.builder.control("")
    });

    this.searchPhraseSubscription = this.store
      .select(selectSearchPhrase)
      .subscribe(formValue => {
        this.searchForm.setValue({
          searchInput: formValue
        });
      });
  }

  ngOnDestroy(): void {
    this.dataSourceSubscription.unsubscribe();
    this.searchPhraseSubscription.unsubscribe();
  }

  handleInputChange(event): void {
    this.store.dispatch(new UpdateSearchPhraseRequest(event.target.value));
  }

  openDialog(stationName: string, stationId: number): void {
    this.store.dispatch(
      new StationDataFetchRequestAction({ name: stationName, id: stationId })
    );
    this.dialog.open(StationsModalComponent, {
      height: "500px",
      width: "500px"
    });
  }
}
