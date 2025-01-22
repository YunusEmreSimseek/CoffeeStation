import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Angular Material Modülleri
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';




import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './Services/Auth/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';



import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './components/user/home/home.component';


import { BasketComponent } from './components/user/basket/basket.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AddUserDialogComponent } from './components/dialogs/add-user-dialog/add-user-dialog.component';
import { DiscountsComponent } from './components/admin/discounts/discounts/discounts.component';
import { AddDiscountDialogComponent } from './components/dialogs/add-discount-dialog/add-discount-dialog.component';
import { CoffeesComponent } from './components/admin/coffees/coffees.component';
import { AddCoffeeDialogComponent } from './components/dialogs/add-coffee-dialog/add-coffee-dialog.component';
import { AddAddressDialogComponent } from './components/dialogs/add-address-dialog/add-address-dialog.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { AddEditCategoryDialogComponent } from './components/dialogs/add-edit-category-dialog/add-edit-category-dialog.component';
import { AdminCategoriesComponent } from './components/admin/admin-categories/admin-categories.component';
import { TooltipDirective } from './tooltip.directive';
import { TruncatePipe } from './truncate.pipe';
import { ProductsComponent } from './components/user/products/products.component';








@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    BasketComponent,
    NavbarComponent,
    HomeComponent,
    ConfirmDialogComponent,
    DashboardComponent,
    AdminLayoutComponent,
    UsersComponent,
    AddUserDialogComponent,
    DiscountsComponent,
    AddDiscountDialogComponent,
    CoffeesComponent,
    AddCoffeeDialogComponent,
    AddAddressDialogComponent,
    OrdersComponent,
    AddEditCategoryDialogComponent,
    AdminCategoriesComponent,
    TooltipDirective,
    TruncatePipe,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost"],
      },
    }),
    // Angular Material Modülleri
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatListModule,
    MatDialogModule,
    MatSidenavModule,
    MatMenuModule,
    MatSelectModule,


  ],
  providers: [
    // provideHttpClient(withInterceptors([AuthInterceptor])),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

export function tokenGetter() {
  return localStorage.getItem("token");
}
