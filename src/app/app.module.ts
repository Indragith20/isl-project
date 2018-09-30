import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { FIREBASE_CONFIG } from '../firebase.credentials';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Network } from '@ionic-native/network/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
// import { FirebaseMessaging } from '@ionic-native/firebase-messaging/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './services/app.service';
import { CustomTwitterService } from './services/twitter.service';
import { LoaderService } from './services/loader.service';
import { NetworkServiceProvider } from './services/network.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppService,
    WebView,
    NativePageTransitions,
    InAppBrowser,
    DatePicker,
    CustomTwitterService,
    HTTP,
    Network,
    LoaderService,
    NetworkServiceProvider,
    FCM,
    //FirebaseMessaging,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
