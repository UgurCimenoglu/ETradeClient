import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { FileUploadDialogsComponent } from '../file-upload-dialogs/file-upload-dialogs.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [DeleteDialogComponent, FileUploadDialogsComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class DialogModule {}
