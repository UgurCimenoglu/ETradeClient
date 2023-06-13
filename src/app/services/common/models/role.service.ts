import { Observable, firstValueFrom, observable } from 'rxjs';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { List_Role } from 'src/app/contracts/roles/list_role';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private httpClientService: HttpClientService) {}

  async getRoles(
    page: number,
    size: number,
    successCallback?: () => void,
    errorCallback?: (errorMessage: string) => void
  ): Promise<{
    datas: List_Role[];
    totalCount: number;
  }> {
    const promiseData: Promise<{
      datas: List_Role[];
      totalCount: number;
    }> = this.httpClientService
      .get<{
        datas: List_Role[];
        totalCount: number;
      }>({
        controller: 'roles',
        queryString: `page=${page}&size=${size}`,
      })
      .toPromise();

    promiseData
      .then((d) => successCallback())
      .catch((errorResponse: HttpErrorResponse) => {
        errorCallback(errorResponse.message);
      });
    return await promiseData;
  }

  async create(
    name: string,
    successCallback?: () => void,
    errorCallback?: (error: Array<string>) => void
  ) {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'roles',
      },
      { name: name }
    );
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallback).catch(errorCallback);

    return (await promiseData) as { succeeded: boolean };
  }
}
