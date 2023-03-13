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

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(
    private toastrService: CustomToastrService,
    private userAuthService: UserAuthService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            this.toastrService.message(
              'Bu işleme erişim yetkiniz bulunmamaktadır!',
              'Yetki Hatası!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopCenter,
              }
            );
            this.userAuthService
              .refreshTokenLogin(localStorage.getItem('refreshToken'), () => {})
              .then((data) => {});
            break;
          case HttpStatusCode.InternalServerError:
            this.toastrService.message(
              'Sunucuya Erişim Sağlanamadı!',
              'Sunucu Erişim Hatası!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopCenter,
              }
            );
            break;
          case HttpStatusCode.BadRequest:
            this.toastrService.message(
              'Geçersiz istek yapıldı!',
              'Geçersiz İstek!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopCenter,
              }
            );
            break;
          case HttpStatusCode.NotFound:
            this.toastrService.message(
              'Aranan Veri Bulunamadı!',
              'Veri Bulunamadı!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopCenter,
              }
            );
            break;
          default:
            this.toastrService.message(
              'Beklenmeyen bir hata meydana geldi!',
              'Beklenmeyen Hata!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopCenter,
              }
            );
            break;
        }
        return of(error);
      })
    );
  }
}
