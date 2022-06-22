import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DBConfig, NgxIndexedDBModule } from "ngx-indexed-db";
import { ReactiveFormsModule } from "@angular/forms";
import DashboardPageComponent from "./components/dashboard-page/dashboard-page.component";
import HomePageComponent from "./components/home-page/home-page.component";
import ProductsSidebarComponent from "./components/products-sidebar/products-sidebar.component";

const dbConfig: DBConfig  = {
  name: 'ProductsDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'products',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'id', options: { unique: true } },
      ]
    },
    {
      store: 'vendors',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'logoUrl', keypath: 'logoUrl', options: { unique: true } },
      ]
    }
  ]
};

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductsSidebarComponent,
    DashboardPageComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
