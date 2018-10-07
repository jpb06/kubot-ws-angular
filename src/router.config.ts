import { Routes } from "@angular/router";
import { HomeComponent } from "./app/home/home.component";
import { GuildSelectorComponent } from "./app/guild-selector/guild-selector.component";
import { AboutComponent } from "./app/about/about.component";


export const routerConfig: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'guild',
    component: GuildSelectorComponent 
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'about',
    component: AboutComponent,
   // canActivate: [CanActivateGuildConfig]
  },
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
