import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { NewsPageModule } from '../news/news.module';
import { MatchesPageModule } from '../matches/matches.module';
import { TeamsPageModule } from '../teams/teams.module';
import { SettingsPageModule } from '../settings/settings.module';
import { TeamDetailsPageModule } from '../team-details/team-details.module';
import { TwitterFeedPageModule } from '../twitter-feed/twitter-feed.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    NewsPageModule,
    MatchesPageModule,
    TeamsPageModule,
    TeamDetailsPageModule,
    SettingsPageModule,
    TwitterFeedPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
