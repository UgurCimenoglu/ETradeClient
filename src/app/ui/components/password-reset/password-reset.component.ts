import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private userAuthService: UserAuthService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {}

  async passwordReset(email: string) {
    this.spinner.show(SpinnerType.BallSpinClockwise);
    await this.userAuthService.passwordReset(email, () => {
      this.alertifyService.message('Mail başarıyla gönderilmiştir.', {
        position: Position.TopRight,
        messageType: MessageType.Notify,
      });
    });
    this.spinner.hide(SpinnerType.BallSpinClockwise);
  }
}
