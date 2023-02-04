import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { DialogService } from './../../services/common/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { List_Product_Image } from './../../contracts/list_product_image';
import { Component, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss'],
})
export class SelectProductImageDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductImageDialogState | string,
    private productService: ProductService,
    private spinnerService: NgxSpinnerService,
    private dialogService: DialogService
  ) {}

  images: List_Product_Image[] | null = null;

  async ngOnInit() {
    await this.getProducts();
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: '.png, .jpg, .jpeg, .gif',
    controller: 'products',
    action: 'upload',
    explanation: 'Ürün resmini seçiniz veya sürükleyiniz...',
    isAdminPage: true,
    queryString: `?id=${this.data}`,
  };

  async getProducts() {
    this.spinnerService.show(SpinnerType.SquareJellyBox);
    this.images = await this.productService.readImages(
      this.data as string,
      () => {
        this.spinnerService.hide(SpinnerType.SquareJellyBox);
      }
    );
  }

  deleteImage(id: string) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      beforeClosed: () => {
        this.spinnerService.show(SpinnerType.BallSpinClockwise);
        this.productService.deleteImage(this.data as string, id, async () => {
          await this.getProducts();
          this.spinnerService.hide(SpinnerType.BallSpinClockwise);
        });
      },
    });
  }
}

export enum ProductImageDialogState {
  Yes = 1,
  No = 0,
}
