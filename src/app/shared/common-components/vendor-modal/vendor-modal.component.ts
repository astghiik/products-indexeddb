import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { NgxIndexedDBService } from "ngx-indexed-db";

@Component({
  selector: 'vendor-modal',
  templateUrl: 'vendor-modal.component.html',
  styleUrls: ['vendor-modal.component.scss']
})

export default class VendorModalComponent implements OnInit {
  vendorForm: any;
  @Input() modalShow: boolean = false;
  @Input() editingVendorId: number | undefined;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private dbService: NgxIndexedDBService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    if (this.editingVendorId) {
      this.dbService.getByID('vendors', this.editingVendorId)
        .subscribe((vendor: any) => {
          this.vendorForm = this.fb.group({
            name: [vendor.name],
            logoUrl: [vendor.logoUrl],
          });
        })
    } else {
      this.vendorForm = this.fb.group({
        name: [null, Validators.required],
        logoUrl: [null, Validators.required],
      });
    }
  }

  add() {
    if (this.vendorForm.valid) {
      const form = {
        name: this.vendorForm.get('name').value,
        logoUrl: this.vendorForm.get('logoUrl').value,
      }

      if (this.editingVendorId) {
        this.dbService
          .update('vendors', {
            id: this.editingVendorId,
            ...form,
          })
          .subscribe(() => {
            this.dbService.getAll('products')
              .subscribe(products => {
                products
                  .filter((product: any) => product.vendor.id === this.editingVendorId)
                  .forEach((product: any) => {
                    this.dbService
                      .update('products', {
                        id: product.id,
                        ...product,
                        vendor: { ...form, id: this.editingVendorId },
                      })
                      .subscribe(() => {});
                  })
            })
          });
      } else {
        this.dbService.add('vendors', form)
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
