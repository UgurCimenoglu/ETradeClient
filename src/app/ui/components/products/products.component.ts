import { HttpClientService } from './../../../services/common/http-client.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private httpClientService: HttpClientService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.httpClientService
      .get({
        controller: 'products',
      })
      .subscribe((data) => {
        console.log(data);
      });
    this.httpClientService.delete(
      {
        controller: 'products',
      },
      'e2aee5ab-8353-424b-b12d-22a73be5228f'
    ).subscribe();
    // this.httpClientService
    //   .put(
    //     {
    //       controller: 'products',
    //     },
    //     {
    //       id: 'e2aee5ab-8353-424b-b12d-22a73be5228f',
    //       name: 'Renkli Kağıt',
    //       price: 7.21,
    //       stock: 85,
    //     }
    //   )
    //   .subscribe();

    // this.httpClientService
    //   .post(
    //     {
    //       controller: 'products',
    //     },
    //     {
    //       name: 'Kalem',
    //       price: 13,
    //       stock: 200,
    //     }
    //   )
    //   .subscribe();
  }
}
