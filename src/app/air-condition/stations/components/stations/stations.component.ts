import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import {
  AppState,
  selectstationsList,
  DataRequestStationsAction,
  selectIsFetching
} from "@app/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";

export interface StationListTable {
  id: number;
  stationName: string;
  addressStreet: string;
}

@Component({
  selector: "anms-stations",
  templateUrl: "./stations.component.html",
  styleUrls: ["./stations.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StationsComponent implements OnInit {
  displayedColumns: string[] = ["stationName", "address"];
  stationsList: StationListTable[];
  dataSource: MatTableDataSource<StationListTable>;
  isFetching: boolean;
  searchPhrase = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new DataRequestStationsAction());
    this.store
      .pipe(select(selectIsFetching))
      .subscribe(status => (this.isFetching = status));

    this.store.pipe(select(selectstationsList)).subscribe(stationslist => {
      this.stationsList = stationslist
        .map(element => ({
          id: element.id,
          stationName: element.city.name,
          addressStreet: element.addressStreet
        }))
        .filter(
          element =>
            element.stationName
              .toLowerCase()
              .indexOf(this.searchPhrase.toLowerCase()) !== -1
        );
      this.dataSource = new MatTableDataSource<StationListTable>(
        this.stationsList
      );
      this.dataSource.paginator = this.paginator;
    });
  }

  handleInputChange(event): void {
    this.searchPhrase = event.target.value;
    this.dataSource = new MatTableDataSource<StationListTable>(
      this.stationsList.filter(
        element =>
          element.stationName
            .toLowerCase()
            .indexOf(this.searchPhrase.toLowerCase()) !== -1
      )
    );
    this.dataSource.paginator = this.paginator;
  }

  handleRowClick(stationId: number): void {
    console.log(stationId);
  }
}
