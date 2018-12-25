import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

import { routerConfig } from "../router.config";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './../security/auth.interceptor';

import { AdminAuthGuard } from '../security/guards/admin.auth.guard';
import { GuildAuthGuard } from '../security/guards/guild.auth.guard';

import { AlertService } from '../services/alert.service';
import { DateService } from '../services/date.service';
import { AdminService } from '../services/api/admin.service';
import { AuthenticationService } from '../services/api/authentication.service';
import { KubotService } from '../services/api/kubot.service';
import { StaticDataService } from '../services/api/static.service';

import { GuildHomeComponent } from './guild-home/guild.home.component';
import { MenuGuestComponent } from './main-menu/menu-guest/menu.guest.component';
import { MenuUserComponent } from './main-menu/menu-user/menu.user.component';
import { AboutComponent } from './about/about.component';
import { GuildFactionsComponent } from './guild-factions/guild.factions.component';
import { GuildRegionsComponent } from './guild-regions/guild.regions.component';
import { WatchItemComponent } from './watch-item/watch.item.component';
import { WatchedFactionSummaryComponent } from './watched-faction-summary/watched.faction.summary.component';
import { AdminComponent } from './admin/admin.component';
import { WatchedRegionsSummaryComponent } from './watched-regions-summary/watched-regions-summary.component';
import { AutocompleteMatchComponent } from './autocomplete-match/autocomplete-match.component';
import { WatchedSummaryItemComponent } from './watched-summary-item/watched-summary-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AlertComponent,
    GuildHomeComponent,
    MenuGuestComponent,
    MenuUserComponent,
    AboutComponent,
    GuildFactionsComponent,
    GuildRegionsComponent,
    WatchItemComponent,
    WatchedFactionSummaryComponent,
    AdminComponent,
    WatchedRegionsSummaryComponent,
    AutocompleteMatchComponent,
    WatchedSummaryItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routerConfig)
  ],
  providers: [
    AdminAuthGuard,
    GuildAuthGuard,
    AlertService,
    AdminService,
    AuthenticationService,
    KubotService,
    StaticDataService,
    DateService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
