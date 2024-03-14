import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './Layout/main-layout/main-layout.component';
import { ToursComponent } from './toursdetails/tours/tours.component';
import { UsersComponent } from './users/users.component';
import { CountriesComponent } from './countries/countries.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { MainloginComponent } from './mainlogin/mainlogin.component';
import { TouriestComponent } from './touriest/touriest.component';
import { AddEditTouriestComponent } from './touriest/add-edit-touriest/add-edit-touriest.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TourDashboardComponent } from './tour-dashboard/tour-dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent, // Your layout component (with header, sidebar, and footer)
    children: [
      { path: '', component: TourDashboardComponent },
      { path: 'tours', component: ToursComponent },
      { path: 'touriest', component: TouriestComponent },
      { path: 'countries', component: CountriesComponent },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'addedittours', component: AddEditTouriestComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'tours', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
