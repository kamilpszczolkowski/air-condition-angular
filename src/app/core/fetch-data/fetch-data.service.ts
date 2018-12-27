import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataStation, AirQualityIndex } from "./fetch-data.models";
import { Observable } from "rxjs";

import { environment as env } from "@env/environment";
import {
  StationSensors,
  SensorMeasurements
} from "@app/air-condition/models/stationsModels";

@Injectable()
export class FetchDataService {
  API_ALL_STATIONS_ENDPOINT = "/station/findAll";
  STATION_AQI_ENDPOINT = "/aqindex/getIndex";
  STATION_SENSORS_ENDPOINT = "/station/sensors";
  SENSOR_DATA_ENDOPINT = "/data/getData";

  constructor(private http: HttpClient) {}

  fetchStationsData(): Observable<DataStation[]> {
    return this.http.get<Array<DataStation>>(
      `${env.apiUrl}${this.API_ALL_STATIONS_ENDPOINT}`
    );
  }

  fetchStationSensors(id: number): Observable<StationSensors[]> {
    return this.http.get<StationSensors[]>(
      `${env.apiUrl}${this.STATION_SENSORS_ENDPOINT}/${id}`
    );
  }

  fetchSensorData(id: number): Observable<SensorMeasurements> {
    return this.http.get<SensorMeasurements>(
      `${env.apiUrl}${this.SENSOR_DATA_ENDOPINT}/${id}`
    );
  }

  fetchStationAQI(id: number): Observable<AirQualityIndex> {
    return this.http.get<AirQualityIndex>(
      `${env.apiUrl}${this.STATION_AQI_ENDPOINT}/${id}`
    );
  }
}
