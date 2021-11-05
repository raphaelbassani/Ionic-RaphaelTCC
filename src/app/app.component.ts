import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { DatabaseProvider } from '../providers/database/database'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    dbProvider: DatabaseProvider
  ) {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      console.log(1);
      dbProvider.createDatabase();
      console.log(2);
        this.splashScreen.hide();
    });
  }
}
