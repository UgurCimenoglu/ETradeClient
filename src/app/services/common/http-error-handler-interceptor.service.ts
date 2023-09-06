import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../ui/custom-toastr.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(
    private toastrService: CustomToastrService,
    private userAuthService: UserAuthService,
    private route: Router,
    private spinner: NgxSpinnerService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            const url = this.route.url;
            this.userAuthService
              .refreshTokenLogin(
                localStorage.getItem('refreshToken'),
                (state: boolean) => {
                  console.log(state);
                  if (!state) {
                    if (url === '/products') {
                      this.toastrService.message(
                        'Sepete ürün eklemek için giriş yapmanız gerekmektedir!',
                        'Oturum Açınız!',
                        {
                          messageType: ToastrMessageType.Warning,
                          position: ToastrPosition.TopRight,
                        }
                      );
                    } else {
                      this.toastrService.message(
                        'Bu işleme erişim yetkiniz bulunmamaktadır!',
                        'Yetki Hatası!',
                        {
                          messageType: ToastrMessageType.Warning,
                          position: ToastrPosition.TopRight,
                        }
                      );
                    }
                  }
                }
              )
              .then((data) => {
                this.toastrService.message(
                  'Bu işleme erişim yetkiniz bulunmamaktadır!',
                  'Yetki Hatası!',
                  {
                    messageType: ToastrMessageType.Warning,
                    position: ToastrPosition.TopRight,
                  }
                );
              });
            break;
          case HttpStatusCode.InternalServerError:
            this.toastrService.message(
              'Sunucuya Erişim Sağlanamadı!',
              'Sunucu Erişim Hatası!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopRight,
              }
            );
            break;
          case HttpStatusCode.BadRequest:
            this.toastrService.message(
              'Geçersiz istek yapıldı!',
              'Geçersiz İstek!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopRight,
              }
            );
            break;
          case HttpStatusCode.NotFound:
            this.toastrService.message(
              'Aranan Veri Bulunamadı!',
              'Veri Bulunamadı!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopRight,
              }
            );
            break;
          default:
            this.toastrService.message(
              'Beklenmeyen bir hata meydana geldi!',
              'Beklenmeyen Hata!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopRight,
              }
            );
            break;
        }
        this.spinner.hide(SpinnerType.BallSpinClockwise);
        this.spinner.hide(SpinnerType.SquareJellyBox);
        return of(error);
      })
    );
  }
}
