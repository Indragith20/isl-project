import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoaderService {
  loadingData: any;
  loader: any;
  loadersList: any[] = [];
  constructor(public loadingController: LoadingController) {}

  async present() {
    this.loadingData = await this.loadingController.create({
        message: 'Loading',
      });
     await this.loadingData.present();
     return await this.loadingData;
  }
}