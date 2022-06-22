import { Component } from "@angular/core";
import { NgxIndexedDBService } from "ngx-indexed-db";
import * as moment from "moment";

@Component({
  templateUrl: 'dashboard-page.component.html',
  styleUrls: ['dashboard-page.component.scss']
})

export default class DashboardPageComponent {
  moment: any = moment;
  productModalShow: boolean = false;
  vendorModalShow: boolean = false;
  editingProductId: number | undefined;
  editingVendorId: number | undefined;
  products: any = [];

  constructor(private dbService: NgxIndexedDBService) {}

  ngOnInit() {
    this.dbService.getAll('products').subscribe(products => {
      this.products = products;
    })
  }

  openProductModal = (id: number | undefined = undefined) => {
    this.editingProductId = id;
    this.productModalShow = true;
  }

  openVendorModal = (id: number | undefined = undefined) => {
    this.editingVendorId = id;
    this.vendorModalShow = true;
  }

  productModalClosed = () => {
    this.productModalShow = false;
    this.ngOnInit();
  }

  vendorModalClosed = () => {
    this.vendorModalShow = false;
    this.ngOnInit();
  }

  deleteProduct(id: number) {
    this.dbService
      .delete('products', id)
      .subscribe(() => { this.ngOnInit() });
  }

  deleteVendor(id: number) {
    this.dbService
      .delete('vendors', id)
      .subscribe(() => {
        this.products.forEach((product: any) => {
          if (product.vendor.id === id) this.deleteProduct(product.id);
        })
        this.ngOnInit();
      });
  }
}
