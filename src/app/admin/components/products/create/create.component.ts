import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private ngxSpinner: NgxSpinnerService,
    private alertifyService: AlertifyService
  ) {
    super(ngxSpinner);
  }

  ngOnInit(): void {}

  @Output() createdProduct: EventEmitter<any> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: 'upload',
    controller: 'products',
    explanation: 'Dosya(ları) sürükleyiniz veya seçiniz...',
    isAdminPage: true,
    accept: '.png,.jpg,.jpeg',
  };
  create(
    name: HTMLInputElement,
    price: HTMLInputElement,
    stock: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.BallSpinClockwise);
    const create_product: Create_Product = {
      name: name.value,
      price: parseInt(price.value),
      stock: parseFloat(stock.value),
    };
    this.productService.create(
      create_product,
      () => {
        this.alertifyService.message('Ürün Başarıyla Eklemiştir.', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight,
        });
        this.createdProduct.emit();
      },
      (errorMessage: Array<string>) => {
        errorMessage.forEach((msg, i) => {
          this.alertifyService.message(msg, {
            dismissOthers: false,
            messageType: MessageType.Error,
            position: Position.TopRight,
            delay: 4,
          });
        });
      }
    );
  }
}
