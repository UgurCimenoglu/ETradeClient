import { BasketComplatedDialogComponent } from './../../../dialogs/basket-complated-dialog/basket-complated-dialog.component';
import { List_Basket_Item } from './../../../contracts/basket/list_basket_item';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BasketsService } from 'src/app/services/common/models/baskets.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss'],
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private basketService: BasketsService,
    private fileService: FileService,
    private orderService: OrderService,
    private toastrService: CustomToastrService,
    private router: Router,
    private dialogService: DialogService
  ) {
    super(spinner);
  }

  basketItems: List_Basket_Item[];
  totalBasketPrices: number;
  basketSpinner: boolean = false;
  baseUrl: BaseUrl;
  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    await this.getBasketItems();
  }

  async updateQuantity(event, id) {
    this.basketSpinner = true;
    await this.basketService.updateQuantity({
      basketItemId: id,
      quantity: event.target.value,
    });
    await this.getBasketItems();
    this.basketSpinner = false;
  }

  async removeToBasket(basketItemId: string) {
    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      beforeClosed: async () => {
        this.basketSpinner = true;
        await this.basketService.remove(basketItemId);
        await this.getBasketItems();
        this.basketSpinner = false;
      },
    });
  }

  async openBasket() {
    await this.getBasketItems();
  }

  async getBasketItems() {
    this.basketSpinner = true;
    this.basketItems = await (
      await this.basketService.get()
    ).map((item, i) => ({
      ...item,
      image: item.image ? `${this.baseUrl.url}/${item.image}` : null,
      price: item.quantity * item.price,
    }));
    this.calculateTotalBasketPrice(this.basketItems);
    console.log(this.basketItems);
    this.basketSpinner = false;
  }

  calculateTotalBasketPrice(items: List_Basket_Item[]) {
    const initialValue = 0;
    this.totalBasketPrices = items.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      initialValue
    );
  }

  async complateOrder() {
    this.dialogService.openDialog({
      componentType: BasketComplatedDialogComponent,
      beforeClosed: async () => {
        this.showSpinner(SpinnerType.BallSpinClockwise);
        await this.orderService.create(
          {
            address: 'Esentepe Mahallesi 23.Sokak Istanbul',
            description: 'Hediye Paketi Yapabilir Misiniz?',
          },
          () => {
            this.router.navigate(['/']);
            window.location.reload();
            this.toastrService.message(
              'Siparişiniz başarıyla oluşturulmuştur',
              'Başarılı',
              {
                messageType: ToastrMessageType.Success,
                position: ToastrPosition.TopRight,
              }
            );
          }
        );
        this.hideSpinner(SpinnerType.BallSpinClockwise);
      },
    });
  }
}
