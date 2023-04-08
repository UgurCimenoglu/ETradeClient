import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-basket-item-remove-dialog',
  templateUrl: './basket-item-remove-dialog.component.html',
  styleUrls: ['./basket-item-remove-dialog.component.scss'],
})
export class BasketItemRemoveDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteState) {}
}
export enum DeleteState {
  Yes = 1,
  No = 0,
}
