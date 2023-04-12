import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Order } from 'src/app/contracts/order/list_order';
import { List_Product } from 'src/app/contracts/product_list';
import { OrderDetailDialogComponent } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService,
    private spinnerService: NgxSpinnerService
  ) {
    super(spinnerService);
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'orderCode',
    'userName',
    'totalPrice',
    'createdDate',
    'viewDetail',
    'delete',
  ];
  dataSource: MatTableDataSource<List_Order> = null;
  async ngOnInit() {
    await this.getOrders();
  }

  async getOrders() {
    this.showSpinner(SpinnerType.BallSpinClockwise);
    const allOrders: { totalCount: number; orders: List_Order[] } =
      await this.orderService.getAllOrders(
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
    this.dataSource = new MatTableDataSource<List_Order>(allOrders.orders);
    this.paginator.length = allOrders.totalCount;
  }
  async pageChanged() {
    await this.getOrders();
  }

  showDetail(id: number) {
    this.dialogService.openDialog({
      componentType: OrderDetailDialogComponent,
      data:id,
      width:"750px",
      beforeClosed: () => {},
    });
  }
}
