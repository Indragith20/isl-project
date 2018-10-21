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
import { HeaderColor } from '@ionic-native/header-color/ngx';
import { LoaderService } from './services/loader.service';
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
  alertBox: any;

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
    private fcm: FCM,
    private headerColor: HeaderColor,
    private loaderService: LoaderService
  ) {
    this.initializeApp();
    this.backButtonStatus();
  }

  initializeApp() {
    this.backButtonCount = 0;
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#99253B80');
      this.splashScreen.hide();
      this.headerColor.tint('#253B80');
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
    

    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
       // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        this.dismissAlert(); 
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });
    
    // stop connect watch
    connectSubscription.unsubscribe();
    disconnectSubscription.unsubscribe();
  }

  getNotifications() {
    this.fcm.subscribeToTopic('all');
    this.fcm.getToken().then((token) => {
      console.log(token);
    });
    let fcmSubscription = this.fcm.onNotification().subscribe(data=>{
      if(data.wasTapped){
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      };
    })
    let fcmTokenSubscription = this.fcm.onTokenRefresh().subscribe(token=>{
      console.log(token);
    });
    fcmSubscription.unsubscribe();
    fcmTokenSubscription.unsubscribe();
  }

  async showAlert() {
    this.alertBox = await this.alertCtrl.create({
        header: 'Ooops!',
        message: `You aren't connected to the internet`,
        buttons: [
          {
            text: 'Close',
            handler: () => {
                navigator['app'].exitApp();
            }
          }
        ],
        cssClass: 'network-error-alert',
        backdropDismiss: false
      });
    this.alertBox.present();
  }

  dismissAlert() {
    if(this.alertBox) {
      this.alertBox.dismiss();
    }
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
