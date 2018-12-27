import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared";

import { StationsComponent } from "./components/stations/stations.component";
import { MapComponent } from "./components/map/map.component";
import { AirConditionRoutingModule } from "./air-condition-routing.module";
import { StationsModalComponent } from "./components/stations-modal/stations-modal.component";

@NgModule({
  imports: [SharedModule, AirConditionRoutingModule],
  declarations: [StationsComponent, MapComponent, StationsModalComponent],
  entryComponents: [StationsModalComponent]
})
export class AirConditionModule {}
