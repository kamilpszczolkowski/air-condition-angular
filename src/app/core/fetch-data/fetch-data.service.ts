import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataStation } from "./fetch-data.models";
import { Observable } from "rxjs";

import { environment as env } from "@env/environment";

@Injectable()
export class FetchDataService {
  API_ALL_STATIONS_ENDPOINT = "/station/findAll";

  constructor(private http: HttpClient) {}

  fetchStationsData(): Observable<DataStation[]> {
    return this.http.get<Array<DataStation>>(
      env.apiUrl + this.API_ALL_STATIONS_ENDPOINT
    );
  }
}
