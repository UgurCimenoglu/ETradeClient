import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SingleOrder } from 'src/app/contracts/order/single_order';
import { OrderService } from 'src/app/services/common/models/order.service';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss'],
})
export class OrderDetailDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService
  ) {
    //console.log(data);order id geliyor
  }
  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  singleOrder: SingleOrder;
  totalPrice: number;

  async ngOnInit() {
    this.singleOrder = await this.orderService.getOrderById(
      this.data as string,
      () => {},
      () => {}
    );
    this.dataSource = this.singleOrder.basketItems;
    this.totalPrice = this.singleOrder.basketItems
      .map((basketItem, i) => basketItem.quantity * basketItem.price)
      .reduce((price, current) => price + current);
  }
}

export enum OrderDetailDialogState {
  Yes = 1,
  No = 0,
}
