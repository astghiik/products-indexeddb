import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import HomePageComponent from "./components/home-page/home-page.component";
import DashboardPageComponent from "./components/dashboard-page/dashboard-page.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
