export class SingleOrder {
  id: string;
  orderCode: string;
  basketItems: BasketItem[];
  address: string;
  createdDate: Date;
  description: string;
}

class BasketItem {
  name: string;
  price: number;
  quantity: number;
}
