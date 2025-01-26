import { Component } from '@angular/core';
import { UserService } from '../../../Services/User/user.service';
import { OrderService } from '../../../Services/Order/order.service';
import { OrderViewModel } from '../orders/orders.component';

// Istatistikler icin gerekli olan interface
export interface Stat {
  title: string;
  value: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  // EventEmitter ile siparisleri aliyoruz
  totalOrder: number = 0;

  // Istatistikler icin gerekli olan degiskenler
  private  totalUser: number = 0;
   stats: Stat[] = [];



  constructor(
    private _userService: UserService,
  ) {
    this.setStats();
    this.getUserNumber();

   }
   // EventEmitter ile siparis saysisini aliyoruz
   receiveMessage(event: number) {
    this.totalOrder = event;
    this.stats[1].value = event;
  }

  // Kullanici sayisini aliyoruz
   getUserNumber(){
    this._userService.getAllUsers().subscribe({
      next: (result) => {
        this.stats[0].value = result.length;
        this.totalUser = result.length;
      },
      error: (err) => {
        console.error('Error: ', err);
      }
    })
   }

   // Istatistikleri ayarlıyoruz
   setStats(){
    const userStats: Stat = {
      title: 'Toplam Kullanıcı',
      value: this.totalUser,
      icon: 'group',
      color: 'accent'
    };
    const orderStats: Stat = {
      title: 'Aktif Sipariş',
      value: this.totalOrder,
      icon: 'shopping_cart',
      color: 'warn'
    };
    const visitorStats: Stat = {
      title: 'Günlük Ziyaretçi',
      value: 250,
      icon: 'visibility',
      color: 'primary'
    };
    const incomeStats: Stat = {
      title: 'Gelir',
      value: 5000,
      icon: 'attach_money',
      color: 'primary'
    };

    this.stats.push(userStats);
    this.stats.push(orderStats);
    this.stats.push(visitorStats);
    this.stats.push(incomeStats);
   }


}
