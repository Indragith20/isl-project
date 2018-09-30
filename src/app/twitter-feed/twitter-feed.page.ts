import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CustomTwitterService } from '../services/twitter.service';
import { ActionSheetController } from '@ionic/angular';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-twitter-feed',
  templateUrl: './twitter-feed.page.html',
  styleUrls: ['./twitter-feed.page.scss']
})
export class TwitterFeedPage implements OnInit {
  bearerToken: string;
  tweets: any[] = [];
  teams: any;
  buttonActions: any[] = [];
  constructor(private twitterService: CustomTwitterService, public actionSheetController: ActionSheetController,
      private teamService: AppService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.twitterService.getBearerToken().then((data) => {
      this.tweets = this.twitterService.tweets;
      console.log(this.tweets);
    }).catch((err) => {
      console.log(err);
    });
    this.getTeams();
  }

  getTeams() {
    this.teamService.getTeams().then((teams) => {
      console.log(teams);
      this.teams = teams;
      this.formButtonActions();
    }).catch((err) => {
      console.log(err);
    });
  }

  formButtonActions() {
    if(this.teams) {
      this.buttonActions = this.teams.map((team) => {
        return {
          text: team.teamName,
          role: 'destructive',
          icon: 'football',
          handler: () => {
            this.filterTweets(team.twitterAccount);
          }
        }
      })
    }
  }

  filterTweets(twitterAccountName: string) {
    console.log(twitterAccountName);
    this.loadTimeline(undefined, twitterAccountName);
  }

  loadTimeline(event, searchString: string = 'IndSuperLeague') {
    this.twitterService.getBearerToken(searchString).then((data) => {
      this.tweets = [...this.twitterService.tweets];
      console.log(this.tweets);
      if(event) {
        event.target.complete();
      }
      this.cd.detectChanges();
    }).catch((err) => {
      console.log(err);
      if(event) {
        event.target.complete();
      }
    });
  }

  async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Filter Tweets',
        buttons: this.buttonActions
      });
      await actionSheet.present();
    }
}
