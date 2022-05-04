import {Component, OnInit} from "@angular/core";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { TYPES } from "../../database/types";
import { COLORS } from "../../database/colors";
import { FormBuilder } from "@angular/forms";

@Component({
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.scss']
})

export default class HomePageComponent implements OnInit {
  filtersForm: any;
  products: any = [];
  filteredProducts: any = [];
  vendors: any = [];
  readonly types = TYPES;
  readonly colors = COLORS;

  constructor (
    private dbService: NgxIndexedDBService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.dbService.getAll('products').subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    })

    this.dbService.getAll('vendors')
      .subscribe(vendors => {
        this.vendors = vendors;
      })

    this.filtersForm = this.fb.group({
      vendor: ['all'],
      type: ['all'],
      color: ['all'],
      searchWord: [''],
    });

    this.filtersForm.valueChanges.subscribe((changes: any) => {
      this.filterProducts(changes);
    });
  }

  filterProducts = (changes: any) => {
    this.filteredProducts = this.products
      .filter((product: any) => {
        return (
          product.name.toLowerCase().includes(changes.searchWord) ||
          product.price.toString().includes(changes.searchWord) ||
          product.color.toLowerCase().includes(changes.searchWord)
        );
      })
      .filter((product: any) => {
        return changes.color === product.color || changes.color === 'all';
      })
      .filter((product: any) => {
        return +changes.type === product.type.id || changes.type === 'all';
      })
      .filter((product: any) => {
        return +changes.vendor === product.vendor.id || changes.vendor === 'all';
      })
  }
}
