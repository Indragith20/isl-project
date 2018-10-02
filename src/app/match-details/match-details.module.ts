import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MatchDetailsPage } from './match-details.page';
import { OverviewComponent } from './overview/overview.component';
import { KeyEventsComponent } from './key-events/key-events.component';
import { StatsComponent } from './stats/stats.component';
import { LineupsComponent } from './lineups/lineups.component';
import { PlayerListComponent } from './lineups/player-list/player-list.component';
import { TimelineComponent, TimelineItemComponent, TimelineTimeComponent } from './key-events/timeline/timeline';

const routes: Routes = [
  {
    path: '',
    component: MatchDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MatchDetailsPage, OverviewComponent, KeyEventsComponent,
     StatsComponent, LineupsComponent, PlayerListComponent, TimelineComponent,
    TimelineItemComponent, TimelineTimeComponent]
})
export class MatchDetailsPageModule {}
