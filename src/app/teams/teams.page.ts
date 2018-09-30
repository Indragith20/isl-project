import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit, OnDestroy {
  teams: any;
  error: any

  constructor(private teamService: AppService, private router: Router) { }

  ngOnInit() {
    this.teamService.getTeams().then((teams) => {
      this.teams = teams;
    }).catch((err) => {
      this.error = err;
    });
  }

  getTeamDetails(team) {
    this.router.navigate(['/team-details',{team: JSON.stringify(team)}]);
  }

  ngOnDestroy() {
    //TODO: Destroy the events subscribed
  }



}
