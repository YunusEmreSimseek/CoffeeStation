
// export class BasketTotal {
//   userId: string;
//   // discountCode: string;
//   // discountRate?: number;
//   basketItems: CoffeeBasketDto[];
//   get totalPrice(): number {
//     return this.basketItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
//   }

//   constructor(
//     userId: string,
//     //  discountCode: string,
//       // discountRate: number,
//        basketItems: CoffeeBasketDto[]
//   ) {
//     this.userId = userId;
//     // this.discountCode = discountCode;
//     // this.discountRate = discountRate;
//     this.basketItems = basketItems;
//   }

// }

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


// export class BasketItem {
//   productId: string;
//   productName: string;
//   productPrice: number;
//   quantity: number;
//   price: number;

//   constructor(productId: string, productName: string, productPrice: number, quantity: number) {
//     this.productId = productId;
//     this.productName = productName;
//     this.productPrice = productPrice;
//     this.quantity = quantity;
//     this.price = productPrice * quantity;
//   }

// }
