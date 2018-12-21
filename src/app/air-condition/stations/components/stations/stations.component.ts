import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from "@angular/core";
import { Store } from "@ngrx/store";
import {
  MatPaginator,
  MatTableDataSource,
  MatDialog,
  MatSort
} from "@angular/material";
import { FormGroup, FormControl } from "@angular/forms";

import {
  AppState,
  DataRequestStationsAction,
  selectIsFetching,
  selectDataSource,
  selectSearchPhrase,
  DataUpdateSearchPhraseRequestAction
} from "@app/core";
import { StationsModalComponent } from "../stations-modal/stations-modal.component";
import { StationListTable } from "@app/core/fetch-data/fetch-data.models";
import { SetStationNameAction } from "../../actions/stations.actions";

@Component({
  selector: "anms-stations",
  templateUrl: "./stations.component.html",
  styleUrls: ["./stations.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StationsComponent implements OnInit {
  displayedColumns: string[] = ["stationName", "address"];
  dataSource: MatTableDataSource<StationListTable>;
  searchForm: FormGroup;

  isFetching$ = this.store.select(selectIsFetching);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(new DataRequestStationsAction());
    this.store.select(selectDataSource).subscribe(list => {
      this.dataSource = new MatTableDataSource<StationListTable>(list);
      this.dataSource.paginator = this.paginator;
      setTimeout(() => (this.dataSource.sort = this.sort));
    });

    this.searchForm = new FormGroup({
      searchInput: new FormControl("")
    });

    this.store.select(selectSearchPhrase).subscribe(formValue => {
      this.searchForm.setValue({
        searchInput: formValue
      });
    });
  }

  handleInputChange(event): void {
    this.store.dispatch(
      new DataUpdateSearchPhraseRequestAction(event.target.value)
    );
  }

  openDialog(stationName: string, stationId: number): void {
    this.store.dispatch(
      new SetStationNameAction({ name: stationName, id: stationId })
    );
    this.dialog.open(StationsModalComponent);
  }

  handleRowClick(stationId: number): void {
    console.log(stationId);
  }
}
