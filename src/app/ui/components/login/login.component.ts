import { ToastrMessageType } from './../../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Login_User } from './../../../contracts/users/login_user';
import { UserService } from './../../../services/common/models/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CustomToastrService,
  ToastrPosition,
} from 'src/app/services/ui/custom-toastr.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { MessageType } from 'src/app/services/admin/alertify.service';
import { AuthService } from 'src/app/services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private toast: CustomToastrService,
    private userService: UserService,
    spinner: NgxSpinnerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super(spinner);
  }

  frm: FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      usernameOrEmail: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  submitted = false;
  onSubmit = async (value: Login_User) => {
    this.submitted = true;
    if (this.frm.valid) {
      this.showSpinner(SpinnerType.SquareJellyBox);
      try {
        await this.userService.login(value, () => {
          this.authService.identityCheck();
          this.activatedRoute.queryParams.subscribe((params) => {
            const returnUrl = params['returnUrl'];
            if (returnUrl) {
              this.router.navigate([returnUrl]);
            }else{
              this.router.navigate([""]);
            }
          });
          this.toast.message('Kullanıcı Girişi Başarılı', 'Bilgilendirme', {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopRight,
          });
        });
      } catch (error) {
      } finally {
        this.hideSpinner(SpinnerType.SquareJellyBox);
      }
    }
  };

  get component() {
    return this.frm.controls;
  }

  validationMessages = {
    usernameOrEmail: {
      required: 'Kullanıcı Adı Zorunludur!',
      minlength: 'Kullanıcı Adı 3 Karakterden Küçük Olamaz!',
      maxlength: 'Kullanıcı Adı 50 Karakterden Büyük Olamaz!',
    },

    password: {
      required: 'Şifre Zorunludur!',
      minlength: 'Şifre 3 Karakterden Küçük Olamaz!',
      maxlength: 'Şifre 50 Karakterden Büyük Olamaz!',
    },
  };
}
