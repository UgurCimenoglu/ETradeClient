import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { ListComponent } from './list/list.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { QrcodeReadingDialogComponent } from 'src/app/dialogs/qrcode-reading-dialog/qrcode-reading-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private dialogService: DialogService
  ) {
    super(spinner);
  }

  ngOnInit(): void {}

  @ViewChild(ListComponent) listComponents: ListComponent;

  createdProduct() {
    this.listComponents.getProducts();
  }

  showProductQRCodeReading() {
    this.dialogService.openDialog({
      componentType: QrcodeReadingDialogComponent,
      width: 'auto',
      height: 'auto',
    });
  }
}
