import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileUploadDialogsComponent } from 'src/app/dialogs/file-upload-dialogs/file-upload-dialogs.component';

@NgModule({
  declarations: [FileUploadComponent, FileUploadDialogsComponent],
  imports: [CommonModule, NgxFileDropModule,MatDialogModule,MatButtonModule],
  exports: [FileUploadComponent],
})
export class FileUploadModule {}
