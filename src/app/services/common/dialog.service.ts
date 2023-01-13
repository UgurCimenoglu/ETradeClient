import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(dialogParameters: Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(dialogParameters.componentType, {});

    dialogRef.beforeClosed().subscribe((result) => {
      if (result === 1) {
        dialogParameters.beforeClosed();
      } else {
        dialogParameters.reject && dialogParameters?.reject();
      }
    });
  }
}

export class DialogParameters {
  componentType: ComponentType<any>;
  beforeClosed: () => any;
  reject?: () => any;
}
