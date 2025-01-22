import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../../../Services/Basket/basket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasketTotal } from '../../../Models/Basket/BasketModels';
import { StorageService } from '../../../Services/Storage/storage.service';
import { CoffeeService } from '../../../Services/Coffee/coffee.service';
import { CoffeeBasketDto, CoffeeModel } from '../../../Models/Coffee/coffee.model';
import { AppConsts } from '../../../../appConsts';
import { CategoryService } from '../../../Services/Category/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  categoryName: string = '';
  coffees: CoffeeModel[] = [];
  private basketTotal: BasketTotal = new BasketTotal('', []);


  constructor(
    private route: ActivatedRoute,
    private _coffeeService: CoffeeService,
    private _basketService: BasketService,
    private _storageService: StorageService,
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
    this._basketService.getMyBasket().subscribe({
      next: (value) => {
        this.basketTotal = value;
      },
      error: (err) => {
        console.log('GetMyBasket Error:', err.error);
      },
    })
  }

  // Sepete ekleme işlemi
  addToBasket(coffee: CoffeeModel): void {
    // Eğer kullanıcı giriş yapmamışsa uyarı ver
    if (this._storageService.getUserId() == null) {
      this.snackBar.open('Sepete ekleme işlemi yapabilmek için giriş yapmalısınız!', 'Kapat', {
        duration: 2000,
      });
      return;
    }

    // Sepette aynı kahveden var mı kontrol et
    const itemIndex = this.basketTotal.basketItems.findIndex(item => item.id === coffee.id);
    if (itemIndex > -1) {
      // Eğer kahve zaten sepette varsa miktarını artır
      this.basketTotal.basketItems[itemIndex].quantity += 1;
    } else {
      // Eğer kahve sepette yoksa ekle
      this.basketTotal.userId = this._storageService.getUserId() ?? '';
      const coffeeDto: CoffeeBasketDto = {
        id: coffee.id,
        name: coffee.name,
        description: coffee.description,
        image: coffee.image,
        price: coffee.price,
        categoryId: coffee.categoryId,
        quantity: 1
      };
      this.basketTotal.basketItems.push({ ...coffeeDto });
    }
    // Sepete ekleme işlemi
    this._basketService.AddToBasket(this.basketTotal);
    this.snackBar.open(`${coffee.name} sepete eklendi!`, 'Kapat', {
      duration: 2000,
    });
  }

  get categoryImage(){
      return AppConsts.coffeeImageUrl.toString();
    }


}
