import { Routes } from "@angular/router";

import { HomeComponent } from "./app/home/home.component";
import { LoginComponent } from "./app/login/login.component";
import { GuildHomeComponent } from "./app/guild-home/guild-home.component";

import { AuthGuard } from "./logic/auth.guard";

export const routerConfig: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'guild', component: GuildHomeComponent, canActivate: [AuthGuard] },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
