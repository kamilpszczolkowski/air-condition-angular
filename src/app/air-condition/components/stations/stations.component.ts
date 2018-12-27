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

import { StationsModalComponent } from "../stations-modal/stations-modal.component";
import { StationListTable } from "@app/core/fetch-data/fetch-data.models";
import { StationDataFetchRequestAction } from "../../actions/stations.actions";
import {
  selectIsFetching,
  selectDataSource,
  selectSearchPhrase
} from "@app/core/fetch-data/fetch-data.selectors";
import { AppState } from "@app/core/core.state";
import {
  FetchStationsRequest,
  UpdateSearchPhraseRequest
} from "@app/core/fetch-data/fetch-data.actions";

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
    this.store.dispatch(new FetchStationsRequest());
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
