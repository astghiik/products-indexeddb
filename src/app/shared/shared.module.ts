import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import ProductCardComponent from "./common-components/product-card/product-card.component";
import ProductModalComponent from "./common-components/product-modal/product-modal.component";
import VendorModalComponent from "./common-components/vendor-modal/vendor-modal.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ProductCardComponent,
    ProductModalComponent,
    VendorModalComponent,
  ],
  exports: [
    CommonModule,
    ProductCardComponent,
    ProductModalComponent,
    VendorModalComponent,
  ]
})

export class SharedModule { }
