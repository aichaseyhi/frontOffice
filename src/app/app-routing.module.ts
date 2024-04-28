import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChangePasswordRequestComponent } from './auth/change-password-request/change-password-request.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './components/dash/dashboard/dashboard.component';
import { HomeComponent } from './components/dash/home/home.component';
import { AdministrateurComponent } from './secure/administrateur/administrateur.component';
import { ChatComponent } from './secure/chat/chat.component';
import { ClientComponent } from './secure/client/client.component';
import { FournisseurComponent } from './secure/fournisseur/fournisseur.component';
import { OrdersComponent } from './secure/orders/orders/orders.component';
import { ProduitsComponent } from './secure/produits/produits.component';
import { StoresComponent } from './secure/stores/stores.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'admin', component: AdministrateurComponent },
      { path: 'product', component: ProduitsComponent },
      { path: 'fournisseur', component: FournisseurComponent },
      { path: 'client', component: ClientComponent },
      { path: 'store', component: StoresComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'orders', component: OrdersComponent },

    ],
  },
  { path: 'reset-password', component: ChangePasswordRequestComponent },
  { path: 'change-password', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
