import { Component } from '@angular/core';
import { BasketService } from './Services/Basket/basket.service';
import { StorageService } from './Services/Storage/storage.service';
import { UserService } from './Services/User/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CoffeStationAngular';

  constructor(
   private _storageService: StorageService,
   private _userService: UserService,
  ) {}

  // Kullanıcının rolünü kontrol eden bir getter
  get isAdmin(): boolean {
    return this._storageService.getUserRole() === 'Admin';
  }

  ngOnInit() {
    const isInitialized = sessionStorage.getItem('appInitialized');
    if(!isInitialized){ {
      console.log('Uygulama başlatılıyor...');
      sessionStorage.setItem('appInitialized', 'true');

      this._userService.takeAnonymousToken().subscribe((data: string) => {
        console.log('Anonymous Token:', data);
        this._storageService.saveVisitorToken(data);
        this._storageService.saveUserRole('Visitor');
      });

      // this._authService.getAnonymousToken().subscribe((data: any) => {
      //   this._storageService.saveVisitorToken(data.access_token);
      //   this._storageService.saveUserRole('Visitor');
      // });
    }
  }

}}


