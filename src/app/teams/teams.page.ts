import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit, OnDestroy {
  teams: any;
  error: any

  constructor(private teamService: AppService, private router: Router, private nativePageTransitions: NativePageTransitions) { }

  ngOnInit() {
    this.teamService.getTeams().then((teams) => {
      this.teams = teams;
    }).catch((err) => {
      this.error = err;
    });
  }

  getTeamDetails(team) {
    this.router.navigate(['/team-details',{team: JSON.stringify(team)}]);
    this.applyTransition();
  }

  ngOnDestroy() {
    //TODO: Destroy the events subscribed
  }

  applyTransition() {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 300,
      slowdownfactor: 3,
      slidePixels: 0,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
     }
  
   this.nativePageTransitions.slide(options);
  }



}
