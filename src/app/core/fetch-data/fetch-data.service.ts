import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataStation } from './fetch-data.models';
import { Observable } from 'rxjs';

@Injectable()
export class FetchDataService {

    constructor(private http: HttpClient) {}

    fetchStationsData(): Observable<DataStation[]> {
        return this.http.get<Array<DataStation>>('https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/station/findAll');
    }
}
