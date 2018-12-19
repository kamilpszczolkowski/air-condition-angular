import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StationsComponent } from './stations/components/stations/stations.component';
import { MapComponent } from './map/components/map/map.component';

const routes: Routes = [
    {
        path: 'stations',
        component: StationsComponent,
        data: { title: 'stations'}
    },
    {
        path: 'map',
        component: MapComponent,
        data: { title: 'map'}
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AirConditionRoutingModule {}
