export interface DataState {
    isFetching: boolean;
    stationsList: DataStation[];
}

export interface DataStation {
    id: number;
    stationName: string;
    gegrLat: number;
    gegrLon: number;
    city: DataCity;
    addressStreet: string;
}

export interface DataCity {
    id: number;
    name: string;
    commune: DataCommune;
}

export interface DataCommune {
    communeName: string;
    districtName: string;
    provinceName: string;
}
