import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { Observable, firstValueFrom, observable } from 'rxjs';
import { List_Order } from 'src/app/contracts/order/list_order';
import { SingleOrder } from 'src/app/contracts/order/single_order';

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

  async getAllOrders(
    page: number = 0,
    size: number = 5,
    successCallback?: () => void,
    errorCallback?: (errorMessage) => void
  ): Promise<{ totalCount: number; orders: List_Order[] }> {
    const observable: Observable<{ totalCount: number; orders: List_Order[] }> =
      this.httpClientService.get({
        controller: 'orders',
        queryString: `page=${page}&size=${size}`,
      });
    successCallback();
    const promiseData = firstValueFrom(observable);

    promiseData
      .then(() => {
        successCallback();
      })
      .catch((e) => {
        errorCallback(e);
      });

    return await promiseData;
  }

  async getOrderById(id:string,successCallback?:()=>void,errorCallback?:(error:string)=>void){
    const observable : Observable<SingleOrder> = this.httpClientService.get<SingleOrder>({
      controller:"orders", 
    },id)
    const promiseData = firstValueFrom(observable);
    promiseData.then(result=>{
      successCallback();
    }).catch(e=>{
      errorCallback(e);
    })
    return await promiseData;
  }
}
