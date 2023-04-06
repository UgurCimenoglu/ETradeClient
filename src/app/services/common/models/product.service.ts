import { List_Product_Image } from './../../../contracts/list_product_image';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Product } from './../../../contracts/create_product';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Error } from 'src/app/contracts/error';
import { List_Product } from 'src/app/contracts/product_list';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClientService) {}

  create(
    product: Create_Product,
    successCallBack?: any,
    errorCallBack?: (errorMessage: Array<string>) => void
  ) {
    this.httpClient
      .post(
        {
          controller: 'products',
        },
        product
      )
      .subscribe(
        (result) => {
          successCallBack();
        },
        (errorResponse: HttpErrorResponse) => {
          const _error: Array<Error> = errorResponse.error;
          let message: Array<string> = [];
          _error.forEach((err, i) => {
            err.value.forEach((v, i) => {
              message.push(`Hata Alanı :${err.key} <br> Hata Mesajı : ${v}`);
            });
          });
          errorCallBack(message);
        }
      );
  }

  async read(
    page: number = 0,
    size: number = 5,
    successCallback?: () => void,
    errorCallback?: (errorMessage) => void
  ): Promise<{ totalCount: number; products: List_Product[] }> {
    const promiseData: Promise<{
      totalCount: number;
      products: List_Product[];
    }> = this.httpClient
      .get<{ totalCount: number; products: List_Product[] }>({
        controller: 'products',
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

  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpClient.delete<any>(
      {
        controller: 'products',
      },
      id
    );
    await firstValueFrom(deleteObservable);
  }

  async readImages(
    id: string,
    successCallback?: () => void
  ): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> = this.httpClient.get<
      List_Product_Image[]
    >(
      {
        controller: 'products',
        action: 'getproductimages',
      },
      id
    );
    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    successCallback && successCallback();
    return images;
  }

  async deleteImage(
    id: string,
    imageId: string,
    successCallback?: () => {},
    errorCallback?: () => {}
  ) {
    const deleteObservable = this.httpClient.delete(
      {
        controller: 'products',
        action: 'deleteProductImage',
        queryString: `imageId=${imageId}`,
      },
      id
    );

    firstValueFrom(deleteObservable)
      .then((result) => {
        successCallback && successCallback();
      })
      .catch((e) => {
        errorCallback && errorCallback();
      });
  }

  async changeShowCaseImage(
    imageId: string,
    productId: string,
    successCallback: () => void
  ): Promise<void> {
    const changeShowCaseImageObservable = this.httpClient.get({
      controller: 'products',
      action: 'ChangeShowCaseImage',
      queryString: `imageId=${imageId}&&productId=${productId}`,
    });

    await firstValueFrom(changeShowCaseImageObservable);
    successCallback();
  }
}
