import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { ToastController } from '@ionic/angular';

@Injectable()
export class NetworkServiceProvider {
  public connected: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private connectionToast: any;
  private subscribedToNetworkStatus: boolean = false;

  constructor(private network: Network, private alertCtrl: AlertController, private platform: Platform) {
  }

  public setSubscriptions() {
    console.log(this.network.type);
    if (!this.subscribedToNetworkStatus && this.platform.is('cordova')) {
      this.subscribedToNetworkStatus = true;
      console.log(this.network.type);
      if ('none' === this.network.type) {
        this.showAlert();
      }
      
      this.network.onConnect().subscribe((val) => {
        this.connectionToast.dismiss();
        // console.log('Network onConnect', val);
      });
      this.network.onchange().subscribe((val) => {
        if ('none' === this.network.type) {
            this.showAlert();
        }
      });
      this.network.onDisconnect().subscribe((val) => {
        this.showAlert();
      });
    }
  }

//   private showAlert() {
//     // this.connectionToast = this.toastCtrl.create({
//     //   message: `You aren't connected to the internet`,
//     //   position: 'bottom',
//     //   showCloseButton: false
//     // });
//     // this.connectionToast.present();
//   }

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
  
  }
}