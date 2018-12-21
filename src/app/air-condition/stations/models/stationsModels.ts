export interface StationsState {
  isFetching: boolean;
  stationName: string;
  stationId: number;
  airQualityIndex: string;
  sensors: StationSensors[];
}

export interface StationSensors {
  id: number;
  stationId: number;
  param: SensorParams;
}

export interface SensorParams {
  paramName: string;
  paramFormula: string;
  paramCode: string;
  idParam: number;
}

export interface SensorMeasurements {
  key: string;
  values: SensorValues[];
}

export interface SensorValues {
  date: string;
  value: number;
}
