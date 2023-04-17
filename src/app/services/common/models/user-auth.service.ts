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

  async passwordReset(email: string, successCallback?: () => void) {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'auth',
        action: 'password-reset',
      },
      { email: email }
    );
    await firstValueFrom(observable);
    successCallback();
  }

  async veriftResetToken(
    resetToken: string,
    userId: string,
    successCallback?: () => void
  ): Promise<boolean> {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'auth',
        action: 'verify-reset-token',
      },
      { resetToken: resetToken, userId: userId }
    );
    const state = await firstValueFrom(observable);
    successCallback();
    return state;
  }

  async UpdatePassword(
    userId: string,
    resetToken: string,
    password: string,
    passwordConfirm: string,
    successCallback?: () => void,
    errorCallback?: (error) => void
  ) {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'auth',
        action: 'update-password',
      },
      {
        userId: userId,
        resetToken: resetToken,
        password: password,
        passwordConfirm: passwordConfirm,
      }
    );
    const promiseData: Promise<any> = firstValueFrom(observable);
    promiseData
      .then((result) => {
        successCallback();
      })
      .catch((e) => {
        errorCallback(e);
      });
    await promiseData;
  }
}
