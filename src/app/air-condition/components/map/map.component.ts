import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";

import {
  selectIsFetching,
  selectstationsList
} from "@app/core/fetch-data/fetch-data.selectors";
import { DataRequestStationsAction } from "@app/core/fetch-data/fetch-data.actions";
import { StationDataFetchRequestAction } from "@app/air-condition/actions/stations.actions";
import { AppState } from "@app/core/core.state";

@Component({
  selector: "anms-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  lat = 52.182189;
  lng = 19.353091;
  zoom = 6.7;

  markerIcon = {
    url: require("assets/marker.png"), // gives a data://<value>
    scaledSize: {
      height: 25,
      width: 25
    }
  };

  styleArray = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#212121"
        }
      ]
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575"
        }
      ]
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#212121"
        }
      ]
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: "#757575"
        }
      ]
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e"
        }
      ]
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#181818"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1b1b1b"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#2c2c2c"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8a8a8a"
        }
      ]
    },
    {
      featureType: "road.arterial",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#373737"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#3c3c3c"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "labels",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#4e4e4e"
        }
      ]
    },
    {
      featureType: "road.local",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161"
        }
      ]
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3d3d3d"
        }
      ]
    }
  ];

  isFetching$ = this.store.select(selectIsFetching);
  stationsList = this.store.select(selectstationsList);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new DataRequestStationsAction());
  }

  handleMarkerClick(stationName: string, stationId: number): void {
    this.store.dispatch(
      new StationDataFetchRequestAction({ name: stationName, id: stationId })
    );
  }
}
