import { DialogService } from './../dialog.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { FileUploadDialogsComponent } from 'src/app/dialogs/file-upload-dialogs/file-upload-dialogs.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from '../../admin/alertify.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private toastrService: CustomToastrService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
  ) {}

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    const formData = new FormData();
    for (const droppedFile of files) {
      // Is it a file?

      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        formData.append(file.name, file, droppedFile.relativePath);
      });
    }
    this.dialogService.openDialog({
      componentType: FileUploadDialogsComponent,
      beforeClosed: () => {
        this.httpClientService
          .post(
            {
              controller: this.options.controller,
              action: this.options.action,
              queryString: this.options.queryString,
              headers: new HttpHeaders({ responseType: 'blob' }),
            },
            formData
          )
          .subscribe(
            (result) => {
              const message = 'Dosya(lar) başarıyla yüklenmiştir.';
              if (this.options.isAdminPage) {
                this.alertifyService.message(message, {
                  messageType: MessageType.Success,
                  position: Position.TopRight,
                });
              } else {
                this.toastrService.message(message, 'Başarılı', {
                  messageType: ToastrMessageType.Success,
                  position: ToastrPosition.TopRight,
                });
              }
            },
            (error: HttpErrorResponse) => {
              const message = 'Dosya(lar) yüklenirken hata meydana geldi.';
              if (this.options.isAdminPage) {
                this.alertifyService.message(message, {
                  messageType: MessageType.Error,
                  position: Position.TopRight,
                });
              } else {
                this.toastrService.message(message, 'Hata!', {
                  messageType: ToastrMessageType.Error,
                  position: ToastrPosition.TopRight,
                });
              }
            }
          );
      },
      reject: () => {
        this.files = null;
      },
    });
  }
}

export class FileUploadOptions {
  controller: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage: boolean = false;
}

export enum FileUploadEnumState {
  Yes = 1,
  No = 2,
}
