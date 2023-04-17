import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss'],
})
export class PasswordUpdateComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private userAuthService: UserAuthService,
    private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  state: any = false;
  ngOnInit(): void {
    this.spinner.show(SpinnerType.SquareJellyBox);
    this.activatedRoute.params.subscribe({
      next: async (params) => {
        const userId = params['userId'];
        const resetToken = params['resetToken'];
        this.state = await this.userAuthService.veriftResetToken(
          resetToken,
          userId,
          () => {
            this.state = true;
            this.spinner.hide(SpinnerType.SquareJellyBox);
          }
        );
        console.log(this.state);
      },
    });
  }

  async updatePassword(txtPassword: string, txtPasswordConfirm: string) {
    this.spinner.show(SpinnerType.BallSpinClockwise);
    // if (txtPassword !== txtPasswordConfirm) {
    //   this.alertifyService.message(
    //     'Şifre ve şifre tekrarı uyuşmuyor,lütfen kontrol ediniz!',
    //     {
    //       messageType: MessageType.Error,
    //       position: Position.TopRight,
    //     }
    //   );
    //   this.spinner.hide(SpinnerType.BallSpinClockwise);
    //   return;
    // }
    this.activatedRoute.params.subscribe({
      next: async (params) => {
        const userId = params['userId'];
        const resetToken = params['resetToken'];
        await this.userAuthService.UpdatePassword(
          userId,
          resetToken,
          txtPassword,
          txtPasswordConfirm,
          () => {
            this.spinner.hide(SpinnerType.BallSpinClockwise);
            this.alertifyService.message('Şifre başarıya güncellendi.', {
              messageType: MessageType.Success,
              position: Position.TopRight,
            });
            this.router.navigate(['/login']);
          },
          (error) => {}
        );
      },
    });
  }
}
