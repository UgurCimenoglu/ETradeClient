import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { BasketsService } from 'src/app/services/common/models/baskets.service';
import { FileService } from 'src/app/services/common/models/file.service';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss'],
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private basketService: BasketsService,
    private fileService: FileService
  ) {
    super(spinner);
  }

  basketItems: List_Basket_Item[];
  basketSpinner: boolean = false;
  baseUrl: BaseUrl;
  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    this.basketSpinner = true;
    this.basketItems = await this.basketService.get();
    this.basketSpinner = false;
    this.basketItems = this.basketItems.map((item, i) => ({
      ...item,
      image: item.image ? `${this.baseUrl.url}/${item.image}` : null,
    }));
  }

  async updateQuantity(event, id) {
    this.basketSpinner = true;
    await this.basketService.updateQuantity({
      basketItemId: id,
      quantity: event.target.value,
    });
    this.basketSpinner = false;
  }

  async removeToBasket(basketItemId: string) {
    this.basketSpinner = true;
    await this.basketService.remove(basketItemId);
    this.basketSpinner = false;
  }
}
