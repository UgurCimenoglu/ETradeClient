import { ActivatedRoute } from '@angular/router';
import { List_Product } from './../../../../contracts/product_list';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/common/models/product.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { BaseUrl } from 'src/app/contracts/base_url';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BasketsService } from 'src/app/services/common/models/baskets.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    spinner: NgxSpinnerService,
    private basketService: BasketsService,
    private toastr: CustomToastrService
  ) {
    super(spinner);
  }

  products: List_Product[];
  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  baseUrl: BaseUrl;

  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    this.activatedRoute.params.subscribe(async (params) => {
      this.currentPageNo = parseInt(params['pageNo'] ?? 1);
      let data = await this.productService.read(
        this.currentPageNo - 1,
        12,
        () => {},
        () => {}
      );
      this.totalProductCount = data.totalCount;
      this.products = data.products.map<List_Product>((product) => ({
        ...product,
        imagePath:
          product.productImageFiles.length > 0
            ? `${this.baseUrl.url}/${
                product.productImageFiles?.find((p) => p.showCase === true)
                  ?.path
              }`
            : null,
      }));
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);
      this.pageList = [];
      if (this.totalPageCount >= 7) {
        if (this.currentPageNo - 3 <= 0) {
          for (let i = 1; i <= 7; i++) {
            this.pageList.push(i);
          }
        } else if (this.currentPageNo + 3 >= this.totalPageCount) {
          for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++) {
            this.pageList.push(i);
          }
        } else {
          for (
            let i = this.currentPageNo - 3;
            i <= this.currentPageNo + 3;
            i++
          ) {
            this.pageList.push(i);
          }
        }
      } else {
        for (let i = 1; i <= this.totalPageCount; i++) {
          this.pageList.push(i);
        }
      }
    });
  }

  async addToBasket(product: List_Product) {
    this.showSpinner(SpinnerType.SquareJellyBox);
    await this.basketService.add({ productId: product.id, quantity: 1 });
    this.hideSpinner(SpinnerType.SquareJellyBox);
    this.toastr.message('Ürün Sepete Eklendi!', 'Başarılı', {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight,
    });
  }
}
