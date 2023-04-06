import { Observable, firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { BaseUrl } from 'src/app/contracts/base_url';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private httpClient: HttpClientService) {}

  async getBaseStorageUrl(): Promise<BaseUrl> {
    const observable: Observable<BaseUrl> = this.httpClient.get({
      controller: 'files',
      action: 'GetBaseStorageUrl',
    });
    return await firstValueFrom(observable);
  }
}
