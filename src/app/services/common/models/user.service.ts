import { Create_User } from './../../../contracts/users/create_user';
import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/user';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Login_User } from 'src/app/contracts/users/login_user';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';
import { List_User } from 'src/app/contracts/users/list_user';

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

  async getAllUsers(
    page: number = 0,
    size: number = 5,
    successCallback?: () => void,
    errorCallback?: (errorMessage: string) => void
  ): Promise<{ totalUsersCount: number; users: List_User[] }> {
    const observable: Observable<{
      totalUsersCount: number;
      users: List_User[];
    }> = this.httpClientService.get({
      controller: 'users',
      queryString: `page=${page}&size=${size}`,
    });
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallback).catch((e) => errorCallback(e));

    return await promiseData;
  }

  async assignRoleToUser(
    userId: string,
    roles: string[],
    successCallback?: () => void,
    errorCallback?: (error: string) => void
  ) {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'users',
        action: 'assign-role-to-user',
      },
      { userId: userId, roles: roles }
    );
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallback).catch((e) => errorCallback(e));
    await promiseData;
  }

  async getRolesToUser(
    userId: string,
    successCallback?: () => void,
    errorCallback?: (error: string) => void
  ): Promise<{roles:string[]}> {
    const observable: Observable<{roles:string[]}> = this.httpClientService.get({
      controller: 'users',
      action: `get-roles-to-user`,
    },userId);
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallback).catch((e) => errorCallback(e));
    return await promiseData;
  }
}
