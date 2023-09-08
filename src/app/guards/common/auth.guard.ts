import { SocialAuthService } from '@abacritt/angularx-social-login';
import {
  AuthService,
  _isAuthenticated,
} from './../../services/common/auth.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './../../services/ui/custom-toastr.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private toastr: CustomToastrService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private socialAuthService: SocialAuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.spinner.show(SpinnerType.BallSpinClockwise);
    console.log(this.authService.isAuthenticated);
    if (!this.authService.isAuthenticated) {
      this.socialAuthService.signOut();
      this.router.navigate(['login'], {
        queryParams: { returnUrl: state.url },
      });
      this.toastr.message('Lüttfen Giriş Yapınız!', 'Yetkisiz Erişim!', {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight,
      });
    }
    this.spinner.hide(SpinnerType.BallSpinClockwise);
    return true;
  }
}
