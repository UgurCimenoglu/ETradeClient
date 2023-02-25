import { Create_User } from './../../../contracts/users/create_user';
import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/user';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Login_User } from 'src/app/contracts/users/login_user';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClientService: HttpClientService) {}

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> =
      this.httpClientService.post<Create_User | User>(
        {
          controller: 'Users',
        },
        user
      );
    return (await firstValueFrom(observable)) as Create_User;
  }

  async login(values: Login_User, successCallback: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> =
      this.httpClientService.post<any | Token>(
        {
          controller: 'users',
          action: 'login',
        },
        values
      );
    const token: TokenResponse = await firstValueFrom(observable);
    if (token) {
      localStorage.setItem('accessToken', token.token.accessToken);
      localStorage.setItem('expiration', token.token.expiration.toString());
      successCallback();
    }
  }
}
