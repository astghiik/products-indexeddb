import { Component, Input } from "@angular/core";

@Component({
  selector: 'product-card',
  templateUrl: 'product-card.component.html',
  styleUrls: ['product-card.component.scss']
})

export default class ProductCardComponent {
  @Input() product: any;
}
