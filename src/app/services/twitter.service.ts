import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TwitterConstants } from '../constants/app.constants';
import { HTTP } from '@ionic-native/http/ngx';
import { LoaderService } from './loader.service';

@Injectable()
export class CustomTwitterService {
    bearerToken: string;
    tweets: any[] = [];
    constructor(private http: HttpClient, private ionicHttp: HTTP, private loader: LoaderService) {}

    getBearerToken(searchString: string = 'IndSuperLeague') {
      //this.loader.present();
      return new Promise((resolve, reject) => {
        this.loader.present().then((loader) => {
          if(this.bearerToken) {
            const results = this.getTweets(this.bearerToken,searchString);
            results.then((data) => {
              loader.dismiss();
              resolve(data);    
            });
          } else {
            const data = {
              "grant_type": "client_credentials"
            };
            const headers = {
              "content-type": "application/x-www-form-urlencoded",
              "authorization": "Basic TlRJaFdkejRxNW9DaGcxcUUycGJtSkZFcTpIZ0pYRXlVYTJ4RkxBVzR4d1BUVW9ZWkVGbVRVWmNNT1dObUR4ZGNXdFBDZ3JDSE1zMQ==",
              "cache-control": "no-cache"
            };
            this.ionicHttp.post('https://api.twitter.com/oauth2/token', data, headers).then((data) => {
                const response = JSON.parse(data.data);
                this.bearerToken = response.access_token;
                console.log(this.bearerToken);
                const results = this.getTweets(this.bearerToken,searchString);
                results.then((data) => {
                  loader.dismiss();
                  resolve(data);    
                });
              });
          }
        })
      });
    }

    getTweets(token,searchString) {
      return new Promise((resolve, reject) => {
        const data = null;
        const headers = {
          "accept-language": "application/json",
          "authorization": "Bearer "+token,
          "cache-control": "no-cache"
        };
        this.ionicHttp.get("https://api.twitter.com/1.1/search/tweets.json?q=from%3A"+searchString+"&result_type=recent", data, headers).then((data) => {
          const response = JSON.parse(data.data);
          this.tweets = response.statuses;
          resolve(data);
        });
      });
    }
}