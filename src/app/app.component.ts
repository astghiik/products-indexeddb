import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from "ngx-indexed-db";
import { PRODUCTS_LIST } from "./database/products";
import { VENDORS_LIST } from "./database/vendors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'narine-etibaryan-angular-practical-task';

  constructor(private dbService: NgxIndexedDBService){
  }

  ngOnInit() {
    // Dummy Data
    PRODUCTS_LIST.forEach(product => {
      this.dbService
        .add('products', product)
        .subscribe(() => {});
    });

    VENDORS_LIST.forEach(vendor => {
      this.dbService
        .add('vendors', vendor)
        .subscribe(() => {});
    })
  }
}
