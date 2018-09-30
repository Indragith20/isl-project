import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
    selector: 'app-news',
    templateUrl: './news.page.html',
    styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
    news: any[] = [];

    constructor(private newsService: AppService, private iab: InAppBrowser) {
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
            toolbarcolor: '#488aff',
            navigationbuttoncolor: '#ffffff',
            hideurlbar: 'yes',
            closebuttoncaption: 'close',
            hidespinner: 'no'
        };
        const browser = this.iab.create(link,'_self', options);
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
