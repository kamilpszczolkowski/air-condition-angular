import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from "@angular/core";
import { Store } from "@ngrx/store";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { FormGroupDirective, FormGroup, FormControl } from "@angular/forms";

import {
  AppState,
  DataRequestStationsAction,
  selectIsFetching,
  selectDataSource,
  selectSearchPhrase,
  DataUpdateSearchPhraseRequestAction
} from "@app/core";
import { StationListTable } from "../../models/stationsModels";

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

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new DataRequestStationsAction());
    this.store.select(selectDataSource).subscribe(list => {
      this.dataSource = new MatTableDataSource<StationListTable>(list);
      this.dataSource.paginator = this.paginator;
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

  handleRowClick(stationId: number): void {
    console.log(stationId);
  }
}
