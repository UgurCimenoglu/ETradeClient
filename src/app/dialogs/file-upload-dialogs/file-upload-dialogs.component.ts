import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload-dialogs',
  templateUrl: './file-upload-dialogs.component.html',
  styleUrls: ['./file-upload-dialogs.component.scss'],
})
export class FileUploadDialogsComponent {
  constructor(
    dialogRef: MatDialogRef<FileUploadDialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileUploadDialogState
  ) {}

  ngOnInit(): void {}
}

export enum FileUploadDialogState {
  Yes = 1,
  No = 0,
}
