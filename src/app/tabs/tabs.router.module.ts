import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { NewsPage } from '../news/news.page';
import { MatchesPage } from '../matches/matches.page';
import { TeamsPage } from '../teams/teams.page';
import { SettingsPage } from '../settings/settings.page';
import { TeamDetailsPage } from '../team-details/team-details.page';
import { TwitterFeedPage } from '../twitter-feed/twitter-feed.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(news:news)',
        pathMatch: 'full',
      },
      {
        path: 'news',
        outlet: 'news',
        component: NewsPage
      },
      {
        path: 'matches',
        outlet: 'matches',
        component: MatchesPage
      },
      {
        path: 'teams',
        outlet: 'teams',
        component: TeamsPage
      },
      {
        path: 'team-details/:teamId',
        outlet: 'team-details',
        component: TeamDetailsPage
      },
      {
        path: 'twitter',
        outlet: 'twitter',
        component: TwitterFeedPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(news:news)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
