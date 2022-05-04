import { Component } from "@angular/core";
import { NgxIndexedDBService } from "ngx-indexed-db";

@Component({
  selector: 'products-sidebar',
  templateUrl: 'products-sidebar.component.html',
})

export default class ProductsSidebarComponent {
  latestProducts: any = [];

  constructor(private dbService: NgxIndexedDBService) {}

  ngOnInit() {
    this.dbService.getAll('products').subscribe(products => {
      this.latestProducts = products
        .sort((a: any, b: any) => new Date(b.createdDate).valueOf() - new Date(a.createdDate).valueOf())
        .slice(0, 5);
    })
  }
}

