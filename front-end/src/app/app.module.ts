import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from './modules/home/home.module';
import {RouterModule} from '@angular/router';
import {PagesComponent} from './modules/pages/pages.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {NavComponent} from './layout/nav/nav.component';
import {LoadingComponent} from './layout/loading/loading.component';
import {BreadcrumbComponent} from './layout/breadcrumb/breadcrumb.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    NavComponent,
    LoadingComponent,
    BreadcrumbComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,

    HomeModule,

    AppRoutingModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
