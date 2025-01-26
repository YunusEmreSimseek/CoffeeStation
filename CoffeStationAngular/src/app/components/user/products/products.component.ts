import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../../../Services/Basket/basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../../Services/Storage/storage.service';
import { CoffeeService } from '../../../Services/Coffee/coffee.service';
import { ProductModel } from '../../../Models/Coffee/coffee.model';
import { AppConsts } from '../../../../appConsts';
import { CategoryService } from '../../../Services/Category/category.service';
import { BasketItemModel, BasketModel } from '../../../Models/Basket/BasketModels';
import { UserService } from '../../../Services/User/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  // Kategori adı
  categoryName: string = '';
  // Kategoriye ait kahveler
  coffees: ProductModel[] = [];
  // Sepet bilgisi
  private basket: BasketModel = { userId: '', basketItems: [], totalPrice: 0 };


  constructor(
    private route: ActivatedRoute,
    private _coffeeService: CoffeeService,
    private _basketService: BasketService,
    private _storageService: StorageService,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    // Parametre olarak gelen kategori id'sine göre kahveleri getir
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getProductsByCategory(id);
    }
    });
    this.getBasket();
  }

  // Kategoriye göre kahve getir
  getProductsByCategory(id: string){
    this._coffeeService.getCoffeesByCategory(id).subscribe({
      next: (value) => {
        this.coffees = value;
      },
      error: (err) => {
        console.log('GetCoffeeById Error:', err.error);
      },
    })
  }

  // Sepet bilgisini getir
  getBasket(){
    if(this._storageService.getUserIsLoggedIn()){
      this._basketService.getUserBasket().subscribe({
        next: (value) => {
          this.basket = value;
        },
        error: (err) => {
          console.log('GetMyBasket Error:', err.error);
        },
      });
    }
  }

  // Sepete ekleme işlemi
  addToBasket(coffee: ProductModel): void {
    // Eğer kullanıcı giriş yapmamışsa uyarı ver
    if (!this._storageService.getUserIsLoggedIn()) {
      this.snackBar.open('Sepete ekleme işlemi yapabilmek için giriş yapmalısınız!', 'Kapat', {
        duration: 2000,
      });
      return;
    }

    // Sepette aynı kahveden var mı kontrol et
    const itemIndex = this.basket.basketItems.findIndex(item => item.productId === coffee.productId);
    if (itemIndex > -1) {
      // Eğer kahve zaten sepette varsa miktarını artır
      this.basket.basketItems[itemIndex].quantity += 1;
    } else {
      // Eğer kahve sepette yoksa ekle
      this.basket.userId = this._storageService.getUserId() ?? '';
      const newCoffee: BasketItemModel = {
        productId: coffee.productId,
        productName: coffee.productName,
        quantity: 1,
        price: coffee.productPrice,
      };
      this.basket.basketItems.push({ ...newCoffee });
    }
    // Sepete ekleme işlemi
    this._basketService.AddToBasket(this.basket);
    this.snackBar.open(`${coffee.productName} sepete eklendi!`, 'Kapat', {
      duration: 2000,
    });
  }

  get categoryImage(){
      return AppConsts.coffeeImageUrl.toString();
    }


}
