import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared";

import { StationsComponent } from "./stations/components/stations/stations.component";
import { MapComponent } from "./map/components/map/map.component";
import { AirConditionRoutingModule } from "./air-condition-routing.module";
import { StationsModalComponent } from "./stations/components/stations-modal/stations-modal.component";

@NgModule({
  imports: [SharedModule, AirConditionRoutingModule],
  declarations: [StationsComponent, MapComponent, StationsModalComponent],
  entryComponents: [StationsModalComponent]
})
export class AirConditionModule {}
