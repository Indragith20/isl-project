import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Platform, IonRouterOutlet, ToastController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppService } from './services/app.service';
import { Router } from '@angular/router';
import { NetworkServiceProvider } from './services/network.service';
import { Network } from '@ionic-native/network/ngx';
import { Location } from '@angular/common';
import { FCM } from '@ionic-native/fcm/ngx';
//import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  //@ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  backButtonCount: number;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appService: AppService,
    private toast: ToastController,
    private router: Router,
    private netService: NetworkServiceProvider,
    private network: Network,
    private alertCtrl: AlertController,
    private _location: Location,
    private fcm: FCM
  //  private firebaseMessaging: FirebaseMessaging
  ) {
    this.initializeApp();
    this.backButtonStatus();
  }

  initializeApp() {
    this.backButtonCount = 0;
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.network.type === 'none') {
        this.showAlert();
      }
      this.getNotifications();
      this.getNetworkInformation();
    });
    this.appService.getTeams();
  }

  getNetworkInformation() {
    console.log('heelllo');
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.showAlert();
    });
    
    // stop disconnect watch
    disconnectSubscription.unsubscribe();

    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
       // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });
    
    // stop connect watch
    connectSubscription.unsubscribe();
  }

  getNotifications() {
    this.fcm.subscribeToTopic('all');
    this.fcm.getToken().then((token) => {
      console.log(token);
    });
    this.fcm.onNotification().subscribe(data=>{
      if(data.wasTapped){
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      };
    })
    this.fcm.onTokenRefresh().subscribe(token=>{
      console.log(token);
    });

    // this.firebaseMessaging.subscribe('all');
    // const fireSub = this.firebaseMessaging.onMessage().subscribe((data) => {
    //   console.log(data);
    // });
    //this.customfirebase.getToken().then(token => console.log(token)).catch(err=> console.log(err));
    
    // let notificationSubscription = this.customfirebase.onNotificationOpen().subscribe(data=>{
    //   console.log(data);
    //   console.log(data.name)
    // }, err=> console.log(err));
    //fireSub.unsubscribe();
    //notificationSubscription.unsubscribe();
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
        header: 'Ooops!',
        message: `You aren't connected to the internet`,
        buttons: [
          {
            text: 'Close',
            handler: () => {
                navigator['app'].exitApp();
            }
          }
        ]
      });
    alert.present();
  }

  backButtonStatus() {
    this.platform.backButton.subscribe(() => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
            //outlet.pop();
            this._location.back();
        } else {
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            // this.platform.exitApp(); // Exit from app
              navigator['app'].exitApp(); // work in ionic 4
          } else {
              this.presentToast();
              this.lastTimeBackPress = new Date().getTime();
          }
        }
    });
    });
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Press back again to exit App.',
      duration: 2000
    });
    toast.present();
  }
}