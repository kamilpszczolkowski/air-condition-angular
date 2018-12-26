import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SettingsContainerComponent } from "./settings";

const routes: Routes = [
  {
    path: "",
    redirectTo: "stations",
    pathMatch: "full"
  },
  {
    path: "settings",
    component: SettingsContainerComponent,
    data: { title: "anms.menu.settings" }
  },
  {
    path: "**",
    redirectTo: "stations"
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: "enabled"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
