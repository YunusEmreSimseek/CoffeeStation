import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../../Services/Basket/basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DiscountService } from '../../../Services/Discount/discount.service';
import { AddressService } from '../../../Services/Address/address.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAddressDialogComponent } from '../../dialogs/add-address-dialog/add-address-dialog.component';
import { OrderService } from '../../../Services/Order/order.service';
import { CreateOrderModel } from '../../../Models/Order/OrderModels';
import { AppConsts } from '../../../../appConsts';
import { BasketItemModel, BasketModel } from '../../../Models/Basket/BasketModels';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit {

  dataSource: MatTableDataSource<BasketItemModel> = new MatTableDataSource<BasketItemModel>([]);
  // tabloda gösterilecek sütunlar
  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'total', 'actions'];
  basket: BasketModel = { userId: '', basketItems: [], totalPrice: 0};
  isCouponApplied: boolean = false;
  couponCode: string = '';
  discountRate: number = 0;
  discoundedPrice: number = 0;

  constructor(
    private _basketService : BasketService,
    private _discountService: DiscountService,
    private _addressService: AddressService,
    private _orderService: OrderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog

  ) {
   }

  ngOnInit(): void {
    this.getUserBasket();
  }

  getUserBasket(){
    this._basketService.getUserBasket().subscribe(data => {
      this.basket = data;
      this.dataSource.data = data.basketItems;
    });
  }



  // Miktarı Azaltma
  decreaseQuantity(item: BasketItemModel): void {
    const index = this.basket.basketItems.indexOf(item);
    if (item.quantity > 1) {
      this.basket.basketItems[index].quantity -= 1;
      this.basket
      this._basketService.updateBasket(this.basket).subscribe(
        data => {
          this.getUserBasket();
        }
      );
    }
    else {
      this.removeItem(item.productId);
    }
  }

  // Miktarı Artırma
  increaseQuantity(item: BasketItemModel): void {
    const index = this.basket.basketItems.indexOf(item);
    if (index > -1) {
      // Eğer kahve sepette varsa miktarını artır
      this.basket.basketItems[index].quantity += 1;
      this._basketService.updateBasket(this.basket).subscribe(
        data => {
          this.getUserBasket();
          // Miktarı güncelle
        }
      );
    }

  }

  // Sepetten Kahve Kaldırma
  removeItem(coffeeId: string): void {
    const currentItems = this.basket.basketItems.filter(item => item.productId !== coffeeId);
    this.basket.basketItems = currentItems;
    this._basketService.updateBasket(this.basket).subscribe(
      data => {
        this.dataSource.data = currentItems;
        this.snackBar.open('Ürün sepetinizden kaldırıldı', 'Kapat', {
          duration: 2000,
        });
      }
    );



  }

  get categoryImage(){
        return AppConsts.coffeeImageUrl.toString();
      }


  // Kupon Uygulama
  applyCoupon(): void {
    this._discountService.getDiscountByCode(this.couponCode).subscribe(data => {
      if (data) {
        this.discountRate = data.rate;
        this.discoundedPrice = (this.basket.totalPrice * this.discountRate / 100);
        this.basket.totalPrice = this.basket.totalPrice - (this.basket.totalPrice * this.discountRate / 100);
        this.isCouponApplied = true;
        this.snackBar.open('Kupon başarıyla uygulandı', 'Kapat', {
          duration: 2000,
        });
      }
      else {
        this.snackBar.open('Kupon kodu hatalı', 'Kapat', {
          duration: 2000,
        });
      }
    });
  }

  // Ödeme Yapma
  onPayClick() {
    this._addressService.getCurrentUserAdress().subscribe({
      next: (value) => {
        console.log('GetCurrentUserAdress Success:', value);
        this.createOrder(value.addressId);
      },
      error: (err) => {
        console.log('GetCurrentUserAdress Error:', err.error);
        if (err.error === 'Adres bulunamadi.'){
          const dialogRef = this.dialog.open(AddAddressDialogComponent, {
            width: '400px',
            data: { userId: this.basket.userId }
          });

          // Diyalog kapandıktan sonra
          dialogRef.afterClosed().subscribe(result => {
            if (result === 'success') {
              this.snackBar.open('Adres başarıyla eklendi', 'Kapat', {
                duration: 2000,
              });
            }
          });
        }
    }
  });
  }


  // Sipariş Oluşturma
  createOrder(addressId: number){
    const productIds = this.basket.basketItems.map(item => item.productId);
     const order: CreateOrderModel = {
      userId: this.basket.userId,
      productIds: productIds,
      totalPrice: this.basket.totalPrice,
      addressId: addressId
     }
     console.log('CreateOrderModel:', order);

    this._orderService.createOrder(order).subscribe({
      next: () => {
        this.snackBar.open('Satın alma işlemi başarıyla tamamlandı.', 'Kapat', { duration: 3000 });

      },
      error: (err) => {
        console.log('CreateOrder Error:', err.error);
        this.snackBar.open('Satın alma işlemi başarısız.', 'Kapat', { duration: 3000 });
      }
    });
  }
}
