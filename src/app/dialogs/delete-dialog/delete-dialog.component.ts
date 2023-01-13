import { Component, OnInit, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteState) {}

  ngOnInit(): void {}
}

export enum DeleteState {
  Yes = 1,
  No = 0,
}
