import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.page.html',
  styleUrls: ['./match-details.page.scss'],
})
export class MatchDetailsPage implements OnInit {
  selectedMatch: any;
  team1Details: any;
  team2Details: any;
  eventDetails: any;
  selectedSegment: string;
  headToHeadStats: any;
  participants: any;

  constructor(private matchService: AppService, private router: Router, private _location: Location) { 
    this.selectedSegment = 'overview';
  }

  ngOnInit() {
    this.selectedMatch = this.matchService.selectedMatch;
    if(this.selectedMatch) {
      console.log(this.selectedMatch);
      this.team1Details = this.selectedMatch.team1.teamDetails;
      this.team2Details = this.selectedMatch.team2.teamDetails;
      this.eventDetails = this.selectedMatch;
      this.participants = this.selectedMatch.participants;
      this.getDetailedStats();
    } else {
      this.router.navigate(['/tabs/matches']);
    }
  }

  getDetailedStats() {
    this.matchService.getDetailedStats(this.team1Details.teamId, this.team2Details.teamId)
      .then((data) => {
        console.log(data);
        this.headToHeadStats = {...data};
      }).catch((err) => {
        console.log(err);
      })
  }

  segmentChanged(event) {
    console.log(event.detail.value);
    this.selectedSegment = event.detail.value;
  }

  navToTeamDetailsPage(team) {
    this.router.navigate(['/team-details',{team: JSON.stringify(team)}]);
  }

  goBack() {
    this._location.back();
  }

}
