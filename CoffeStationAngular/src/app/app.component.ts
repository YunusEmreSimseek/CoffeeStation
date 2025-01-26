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

  ngOnInit() {
    const isInitialized2 = this._storageService.isAppInitialized();
    if(!isInitialized2){
      console.log('Uygulama baslatiliyor...');
      this._storageService.saveAppInitialized();
      this.takeAnonymousToken();
    }
}

// Ziyaretci tokeni alma fonksiyonu
takeAnonymousToken() {
  this._userService.takeAnonymousToken().subscribe((data: string) => {
    this._storageService.saveVisitorToken(data);
    this._storageService.saveUserRole('Visitor');
    console.log('Ziyarteci tokeni alindi ve kaydedildi.');
  });
}

 // Kullanıcının rolünü kontrol eden bir getter
 get isAdmin(): boolean {
  return this._storageService.getUserRole() === 'Admin';
}



}


