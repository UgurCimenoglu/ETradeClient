import { Create_User } from './../../../contracts/users/create_user';
import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/user';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Login_User } from 'src/app/contracts/users/login_user';

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

  async login(values: Login_User): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'users',
        action: 'login',
      },
      values
    );
    return await firstValueFrom(observable);
  }
}
