import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/user/home/home.component';
import { BasketComponent } from './components/user/basket/basket.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UsersComponent } from './components/admin/users/users.component';
import { DiscountsComponent } from './components/admin/discounts/discounts/discounts.component';
import { adminGuard } from './Guards/admin.guard';
import { visitorGuard } from './Guards/visitor.guard';
import { userGuard } from './Guards/user.guard';
import { notAdminGuard } from './Guards/not-admin.guard';
import { CoffeesComponent } from './components/admin/coffees/coffees.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { AdminCategoriesComponent } from './components/admin/admin-categories/admin-categories.component';
import { ProductsComponent } from './components/user/products/products.component';

const routes: Routes = [

  { path:"register", component:RegisterComponent,  canActivate: [visitorGuard]},
  { path:"login", component:LoginComponent, canActivate: [visitorGuard]},
  { path:"home", component:HomeComponent, canActivate: [notAdminGuard]},
  { path:"basket", component:BasketComponent, canActivate: [userGuard]},
  { path:"", component:LoginComponent, canActivate: [visitorGuard]},
  { path:"products/:id", component:ProductsComponent, canActivate: [notAdminGuard]},

  {
    path:"admin",
    component:AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'discounts', component: DiscountsComponent },
      { path: 'coffees', component: CoffeesComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'categories', component: AdminCategoriesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path:"**", redirectTo:"dashboard" }
    ]
    },
    { path:"**", redirectTo:"" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
