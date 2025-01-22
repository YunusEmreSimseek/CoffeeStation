import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderService } from '../../../Services/Order/order.service';
import { CoffeeService } from '../../../Services/Coffee/coffee.service';
import { AddressService } from '../../../Services/Address/address.service';
import { OrderModel } from '../../../Models/Order/OrderModels';
import { ProductModel } from '../../../Models/Coffee/coffee.model';
import { AddressModel } from '../../../Models/Adress/AdressModels';
import { firstValueFrom } from 'rxjs';


export interface OrderViewModel {
  orderyId: string;
  userId: string;
  productIds: string[];
  productNames: string[];
  totalPrice: number;
  adressId: number;
  address?: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})

export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['orderyId', 'userId', 'productNames', 'totalPrice', 'address', 'actions'];
  dataSource: OrderViewModel[] = [];
  // EventEmitter ile toplam siparis sayisini gonderdik
  @Output() totalOrderEvent = new EventEmitter<number>();

  constructor(
    private _orderService: OrderService,
    private _coffeeService: CoffeeService,
    private _addressService: AddressService
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  // EventEmitter
  sendOrders() {
    this.totalOrderEvent.emit(this.dataSource.length);
  }

  // Siparişleri yükle
  async loadOrders() {
    try {
      // 1) Tüm siparişleri çek
      const orders: OrderModel[] = await firstValueFrom(this._orderService.getAllOrders());

      // 2) Her order için productNames ve address bilgisi al
      const orderViewModels = await Promise.all(
        orders.map(async (order) => {
          // Product Id’ler -> Product name listesi
          const productNames = await Promise.all(
            order.productIds.map(async pid => {
              const product: ProductModel = await firstValueFrom(this._coffeeService.getCoffeeById(pid));
              return product.productName;
            })
          );

          // Adres bilgisi
          let address: string = '';
          if (order.addressId) {
            const addr: AddressModel = await firstValueFrom(this._addressService.getAddressById(order.addressId));
            address = `${addr.detail} - ${addr.district}/${addr.city}`;
          }

          // Birleştir
          const vm: OrderViewModel = {
            orderyId: order.orderId,
            userId: order.userId,
            productIds: order.productIds,
            productNames: productNames,
            totalPrice: order.totalPrice,
            adressId: order.addressId,
            address: address
          };
          return vm;

        })
      );

      // 3) dataSource’a atayalım
      this.dataSource = orderViewModels;
      this.sendOrders();
    } catch (err) {
      console.error('Siparişleri yüklerken hata:', err);
      // Hata yönetimi (alert, snackbar vb.)
    }
  }

  // Örnek: Siparişi silmek veya başka bir işlem yapmak isterseniz
  onDelete(orderId: string) {
    // ...
  }


}
