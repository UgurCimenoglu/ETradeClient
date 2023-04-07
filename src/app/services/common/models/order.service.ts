import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { Observable, firstValueFrom, observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClientService: HttpClientService) {}

  async create(
    order: Create_Order,
    successCallback?: () => void,
    errorCallback?: (errorMessage) => void
  ): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'orders',
      },
      order
    );
    await firstValueFrom(observable);
    successCallback();
  }
}
