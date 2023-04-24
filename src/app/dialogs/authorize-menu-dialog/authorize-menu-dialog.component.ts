import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss'],
})
export class AuthorizeMenuDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { code: string; name: string } | any
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    console.log(this.data);
  }
}
export enum AuthorizeMenuState {
  Yes = 1,
  No = 0,
}
