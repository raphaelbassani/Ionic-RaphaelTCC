import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage-angular';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { DatabaseProvider } from '../providers/database/database';
import { ProductProvider } from '../providers/task/task';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
    DatabaseProvider,
    ProductProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
