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
import { AddressModel } from '../../../Models/Adress/AdressModels';
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
  totalPrice: number = 0;
  private basket: BasketModel = { userId: '', basketItems: [], totalPrice: 0};
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
    this._basketService.getUserBasket().subscribe(data => {
      this.basket = data;
      this.dataSource.data = data.basketItems;
      this.calculateTotal();
    });
  }



  // Miktarı Azaltma
  decreaseQuantity(item: BasketItemModel): void {
    const index = this.basket.basketItems.indexOf(item);
    if (item.quantity > 1) {
      this.basket.basketItems[index].quantity -= 1;
      this._basketService.updateBasket(this.basket).subscribe(
        data => {
          console.log(data);
          // Miktarı güncelle
        this.calculateTotal();
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
          console.log(data);
          // Miktarı güncelle
          this.calculateTotal();
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
        this.calculateTotal();
        this.snackBar.open('Ürün sepetinizden kaldırıldı', 'Kapat', {
          duration: 2000,
        });
      }
    );



  }

  get categoryImage(){
        return AppConsts.coffeeImageUrl.toString();
      }

  // Toplam Fiyatı Hesaplama
  calculateTotal(): void {
    this.totalPrice = this.basket.basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Kupon Uygulama
  applyCoupon(): void {
    this._discountService.getDiscountByCode(this.couponCode).subscribe(data => {
      if (data) {
        this.discountRate = data.rate;
        this.discoundedPrice = (this.totalPrice * this.discountRate / 100);
        this.totalPrice = this.totalPrice - (this.totalPrice * this.discountRate / 100);
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
            data: { userId: this.basket.userId } // Diyaloğa userId geçebiliriz
          });

          // Diyalog kapandıktan sonra
          dialogRef.afterClosed().subscribe(result => {
            if (result === 'success') {
              // Adres kaydı başarıyla eklendiyse şimdi satın al
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
      totalPrice: this.totalPrice,
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
