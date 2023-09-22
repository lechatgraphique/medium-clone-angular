import { Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";

export const RegisterRoutes: Routes = [
  {
    path: '',
    component: RegisterComponent,
  }
];

export const LoginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }
];
