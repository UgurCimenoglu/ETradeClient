import { RoleService } from './../../../../services/common/models/role.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    private roleService: RoleService,
    private ngxSpinner: NgxSpinnerService,
    private alertifyService: AlertifyService
  ) {
    super(ngxSpinner);
  }

  ngOnInit(): void {}

  @Output() createdRole: EventEmitter<any> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: 'upload',
    controller: 'products',
    explanation: 'Dosya(ları) sürükleyiniz veya seçiniz...',
    isAdminPage: true,
    accept: '.png,.jpg,.jpeg',
  };
  create(name: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallSpinClockwise);
    this.roleService.create(
      name.value,
      () => {
        this.alertifyService.message('Rol Başarıyla Eklemiştir.', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight,
        });
        this.createdRole.emit();
      },
      (errorMessage: Array<string>) => {
        errorMessage.forEach((msg, i) => {
          this.alertifyService.message(msg, {
            dismissOthers: false,
            messageType: MessageType.Error,
            position: Position.TopRight,
            delay: 4,
          });
        });
      }
    );
    this.hideSpinner(SpinnerType.BallSpinClockwise);
  }
}
