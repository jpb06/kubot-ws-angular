import { Routes } from "@angular/router";

import { HomeComponent } from "./app/home/home.component";
import { LoginComponent } from "./app/login/login.component";
import { AboutComponent } from "./app/about/about.component";
import { GuildHomeComponent } from "./app/guild-home/guild.home.component";
import { GuildFactionsComponent } from "./app/guild-factions/guild.factions.component";
import { GuildRegionsComponent } from "./app/guild-regions/guild.regions.component";
import { AdminComponent } from "./app/admin/admin.component";

import { GuildAuthGuard } from "./security/guards/guild.auth.guard";
import { AdminAuthGuard } from "./security/guards/admin.auth.guard";

export const routerConfig: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'guild', component: GuildHomeComponent, canActivate: [GuildAuthGuard] },
  { path: 'factions', component: GuildFactionsComponent, canActivate: [GuildAuthGuard] },
  { path: 'regions', component: GuildRegionsComponent, canActivate: [GuildAuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard] },
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
