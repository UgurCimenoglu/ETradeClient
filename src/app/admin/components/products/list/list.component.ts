import {
  AlertifyService,
  MessageType,
  Position,
} from './../../../../services/admin/alertify.service';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { List_Product } from './../../../../contracts/product_list';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private spinnerService: NgxSpinnerService,
    private alertifyService: AlertifyService
  ) {
    super(spinnerService);
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'name',
    'stock',
    'price',
    'createdDate',
    'updatedDate',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<List_Product> = null;
  async ngOnInit() {
    await this.getProducts();
  }
  async pageChanged() {
    await this.getProducts();
  }
  async getProducts() {
    this.showSpinner(SpinnerType.BallSpinClockwise);
    const allProducts: { totalCount: number; products: List_Product[] } =
      await this.productService.read(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => {
          this.hideSpinner(SpinnerType.BallSpinClockwise);
        },
        (errorMessage: string) => {
          this.alertifyService.message(errorMessage, {
            messageType: MessageType.Error,
            position: Position.TopRight,
          });
        }
      );
    this.dataSource = new MatTableDataSource<List_Product>(
      allProducts.products
    );
    this.paginator.length = allProducts.totalCount;
  }
  delete(id: number, event: MouseEvent) {
    console.log(id);
    console.log(event);
  }
}
