import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { FormBuilder, Validators } from "@angular/forms";
import { TYPES } from '../../../database/types';
import { COLORS } from "../../../database/colors";

@Component({
  selector: 'product-modal',
  templateUrl: 'product-modal.component.html',
  styleUrls: ['product-modal.component.scss']
})

export default class ProductModalComponent implements OnInit {
  @Input() modalShow: boolean = false;
  @Input() editingProductId: number | undefined;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  readonly types = TYPES;
  readonly colors = COLORS;
  vendors: any = [];
  productForm: any;

  constructor(
    private dbService: NgxIndexedDBService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    this.getVendors();
  }

  initForm() {
    if (this.editingProductId) {
      this.dbService.getByID('products', this.editingProductId)
        .subscribe((product: any) => {
          this.productForm = this.fb.group({
            name: [product.name],
            vendor: [product.vendor.id],
            serialNumber: [product.serialNumber],
            type: [product.type.id],
            price: [product.price],
            weight: [product.weight],
            color: [product.color],
            photoUrl: [product.photoUrl],
            releaseDate: [product.releaseDate],
          });
        })
    } else {
      this.productForm = this.fb.group({
        name: [null, Validators.required],
        vendor: [null, Validators.required],
        serialNumber: [null, Validators.required],
        type: [null, Validators.required],
        price: [null, Validators.required],
        weight: [null, Validators.required],
        color: [null, Validators.required],
        photoUrl: [null, Validators.required],
        releaseDate: [null, Validators.required],
      });
    }
  }

  getVendors() {
    this.dbService.getAll('vendors')
      .subscribe(vendors => {
        this.vendors = vendors;
      })
  }

  add() {
    if (this.productForm.valid) {
      const form = {
        name: this.productForm.get('name').value,
        vendor: this.vendors.find((vendor: any) => vendor.id === +this.productForm.get('vendor').value),
        serialNumber: this.productForm.get('serialNumber').value,
        type: this.types.find((type: any) => type.id === +this.productForm.get('type').value),
        price: this.productForm.get('price').value,
        color: this.productForm.get('color').value,
        weight: this.productForm.get('weight').value,
        photoUrl: this.productForm.get('photoUrl').value,
        releaseDate: this.productForm.get('releaseDate').value,
        createdDate: new Date(),
      }

      if (this.editingProductId) {
        this.dbService
          .update('products', {
            id: this.editingProductId,
            ...form,
            createdDate: new Date(),
          })
          .subscribe(() => {});
      } else {
        this.dbService.add('products', { ...form, createdDate: new Date()})
          .subscribe(() => {});
      }

      this.close();
    }
  }

  close() {
    this.modalShow = false;
    this.closeModal.emit(false);
  }
}
