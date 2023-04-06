import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { Login_User } from 'src/app/contracts/users/login_user';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private httpClientService: HttpClientService) {}

  async login(values: Login_User, successCallback?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> =
      this.httpClientService.post<any | Token>(
        {
          controller: 'auth',
          action: 'login',
        },
        values
      );
    const token: TokenResponse = await firstValueFrom(observable);
    if (token) {
      localStorage.setItem('accessToken', token.token.accessToken);
      localStorage.setItem('refreshToken', token.token.refreshToken);
      successCallback();
    }
  }

  async googleLogin(
    user: SocialUser,
    successCallback?: () => void
  ): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> =
      this.httpClientService.post<SocialUser | TokenResponse>(
        {
          controller: 'auth',
          action: 'google-login',
        },
        user
      );

    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
      successCallback();
    }
  }

  async facebookLogin(
    user: SocialUser,
    successCallback?: () => void
  ): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> =
      this.httpClientService.post<SocialUser | TokenResponse>(
        {
          controller: 'auth',
          action: 'facebook-login',
        },
        user
      );
    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
      successCallback();
    }
  }

  async refreshTokenLogin(
    refreshToken: string,
    successCallback: (state) => void
  ) {
    const observable: Observable<any | TokenResponse> =
      this.httpClientService.post(
        {
          controller: 'auth',
          action: 'refreshToken',
        },
        { refreshToken: refreshToken }
      );
    try {
      const tokenResponse: TokenResponse = (await firstValueFrom(
        observable
      )) as TokenResponse;
      if (tokenResponse) {
        localStorage.setItem('accessToken', tokenResponse.token.accessToken);
        localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
        successCallback(tokenResponse ? true : false);
      }
    } catch (error) {
      successCallback(false);
    }
  }
}
