import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-basket-complated-dialog',
  templateUrl: './basket-complated-dialog.component.html',
  styleUrls: ['./basket-complated-dialog.component.scss'],
})
export class BasketComplatedDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteState) {}
}
export enum DeleteState {
  Yes = 1,
  No = 0,
}
