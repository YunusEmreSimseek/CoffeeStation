
export interface BasketModel {
  userId: string;
  basketItems: BasketItemModel[];
  totalPrice: number;
}

export interface BasketItemModel {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

