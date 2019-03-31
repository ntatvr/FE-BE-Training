import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// Google firebase notifications
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor (
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log("Platform ready!!!");
    });

    // This function used to get FCM token then print out to the browser console.
    this.fcm.getToken().then(token => {
      console.log("Token-Get: " + token);
    });

    // this function used to refresh the FCM token.
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log("Token-Refresh: " + token);
    });

    // this function used to receive push notification from Firebase Cloud Messaging.
    this.fcm.onNotification().subscribe(data => {
      console.log("Data from FCM: " + data);
      if (data.wasTapped) {
        console.log('Received in background');
        this.router.navigate([data.landing_page, data.message]);
      } else {
        console.log('Received in foreground');
        this.router.navigate([data.landing_page, data.message]);
      }
    });
  }
}
