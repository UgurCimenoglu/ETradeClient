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
import { AuthService } from 'src/app/services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SocialUser,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

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
    private userAuthService: UserAuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService
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

    this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
      if (user) {
        switch (user.provider) {
          case 'GOOGLE':
            await this.onGoogleLoginSubmit(user);
            break;
          case 'FACEBOOK':
            await this.onFacebookLoginSubmit(user);
            break;
          default:
            break;
        }
      }
      console.log(JSON.stringify(user, null, 2));
    });
  }

  submitted = false;
  onSubmit = async (value: Login_User) => {
    this.submitted = true;
    if (this.frm.valid) {
      this.showSpinner(SpinnerType.SquareJellyBox);
      try {
        await this.userAuthService.login(value, () => {
          this.authService.identityCheck();
          this.activatedRoute.queryParams.subscribe((params) => {
            const returnUrl = params['returnUrl'];
            if (returnUrl) {
              this.router.navigate([returnUrl]);
            } else {
              this.router.navigate(['']);
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

  onGoogleLoginSubmit = async (user: SocialUser) => {
    this.showSpinner(SpinnerType.SquareJellyBox);
    try {
      await this.userAuthService.googleLogin(user, () => {
        this.authService.identityCheck();
        this.activatedRoute.queryParams.subscribe((params) => {
          const returnUrl = params['returnUrl'];
          if (returnUrl) {
            this.router.navigate([returnUrl]);
          } else {
            this.router.navigate(['']);
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
  };
  onFacebookLoginSubmit = async (user: SocialUser) => {
    this.showSpinner(SpinnerType.SquareJellyBox);
    try {
      await this.userAuthService.facebookLogin(user, () => {
        this.authService.identityCheck();
        this.activatedRoute.queryParams.subscribe((params) => {
          const returnUrl = params['returnUrl'];
          if (returnUrl) {
            this.router.navigate([returnUrl]);
          } else {
            this.router.navigate(['']);
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
  };
  openFaceebookLoginInterface() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

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
