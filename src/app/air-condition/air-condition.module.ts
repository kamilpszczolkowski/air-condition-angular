import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared";

import { StationsComponent } from "app/air-condition/components/stations/stations.component";
import { MapComponent } from "app/air-condition/components/map/map.component";
import { AirConditionRoutingModule } from "app/air-condition/air-condition-routing.module";
import { StationsModalComponent } from "app/air-condition/components/stations-modal/stations-modal.component";

@NgModule({
  imports: [SharedModule, AirConditionRoutingModule],
  declarations: [StationsComponent, MapComponent, StationsModalComponent],
  entryComponents: [StationsModalComponent]
})
export class AirConditionModule {}
