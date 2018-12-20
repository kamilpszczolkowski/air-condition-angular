import { Injectable } from "@angular/core";
import { StationListTable } from "../models/stationsModels";
import { DataStation } from "@app/core/fetch-data/fetch-data.models";

@Injectable()
export class StationsService {

  createDataSource(
    searchPhrase: string,
    stationsList: DataStation[]
  ): StationListTable[] {
    return stationsList
      .map(element => ({
        id: element.id,
        stationName: element.city.name,
        addressStreet: element.addressStreet
      }))
      .filter(
        element =>
          element.stationName
            .toLowerCase()
            .indexOf(searchPhrase.toLowerCase()) !== -1
      );
  }
}
