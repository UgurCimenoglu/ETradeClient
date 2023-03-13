import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './../ui/custom-toastr.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private jwtHelper: JwtHelperService,
    private toastr: CustomToastrService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  identityCheck() {
    const token: string = localStorage.getItem('accessToken');
    let isExpired: boolean;
    try {
      isExpired = this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      isExpired = true;
    }
    _isAuthenticated = token != null && !isExpired;
  }

  get isAuthenticated(): boolean {
    this.identityCheck();
    return _isAuthenticated;
  }

  async signOut() {
    localStorage.removeItem('accessToken');
    this.socialAuthService.signOut();
    this.identityCheck();
    this.router.navigate(['']);
    this.toastr.message('Başarıyla çıkış yapıldı.', 'Bilgilendirme!', {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight,
    });
  }
}

export let _isAuthenticated: boolean;
