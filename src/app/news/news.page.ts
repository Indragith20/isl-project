import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { LoaderService } from '../services/loader.service';
import { LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-news',
    templateUrl: './news.page.html',
    styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
    news: any[] = [];

    constructor(private newsService: AppService, private iab: InAppBrowser, public loadingController: LoadingController) {
    }

    ngOnInit() {
        this.newsService.getNews().then((news) => {
            console.log(news);
            if (news) {
                Object.keys(news).map((key) => {
                    this.news.push(news[key]);
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    openNews(link) {
        let options: InAppBrowserOptions = {
            location: 'yes',
            hidenavigationbuttons:'yes',
            toolbarposition: 'bottom',
            toolbarcolor: '#253B80',
            navigationbuttoncolor: '#ffffff',
            hideurlbar: 'yes',
            closebuttoncaption: 'close',
            hidespinner: 'no',
            hidden: 'yes'
        };
        const browser = this.iab.create(link,'_self', options);
        this.loadingController.create({
              message: 'Loading Full News...Please Wait',
              showBackdrop: false,
              translucent: true
        }).then((loader) => {
            loader.present();
            browser.on('loadstop').subscribe((data) => {
                browser.show();
                loader.dismiss();
            });
            browser.on('loaderror').subscribe((event) => {
                loader.dismiss();
            });
            browser.on('exit').subscribe((event) => {
                loader.dismiss();
            });
            browser.on('loadstop').subscribe((event) => {
                loader.dismiss();
            });
        });
    }

    doRefresh(event) {
        console.log(event);
        this.news = [];
        this.newsService.getNews().then((news) => {
            if (news) {
                Object.keys(news).map((key) => {
                    this.news.push(news[key]);
                });
                //this.news = news;
            }
            event.target.complete();
        }).catch((err) => {
            event.target.complete();
        });
    }

    loadMoreData(event) {
        console.log(event);
        this.newsService.getNextNews().then((news: any) => {
            if (news) {
                news.map((latest) => {
                    if (latest.title) {
                        this.news.push(latest);
                    }
                });
            }
            event.target.complete();
        }).catch((err) => {
            event.target.complete();
        });
    }

}
