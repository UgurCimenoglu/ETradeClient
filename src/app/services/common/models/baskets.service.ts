import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_iyem';

@Injectable({
  providedIn: 'root',
})
export class BasketsService {
  constructor(private httpClientService: HttpClientService) {}

  async get(): Promise<List_Basket_Item[]> {
    const observable: Observable<List_Basket_Item[]> =
      this.httpClientService.get({
        controller: 'baskets',
      });
    return await firstValueFrom(observable);
  }

  async add(product: Create_Basket_Item): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'baskets',
      },
      product
    );
    return await firstValueFrom(observable);
  }

  async updateQuantity(basketItem: Update_Basket_Item): Promise<any> {
    const observable: Observable<any> = this.httpClientService.put(
      {
        controller: 'baskets',
      },
      basketItem
    );

    return await firstValueFrom(observable);
  }

  async remove(basketItemId: string): Promise<any> {
    const observable = this.httpClientService.delete(
      {
        controller: 'baskets',
      },
      basketItemId
    );
    await firstValueFrom(observable);
  }
}
