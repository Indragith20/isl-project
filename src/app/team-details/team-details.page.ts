import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../services/app.service';
import {Location} from '@angular/common';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.page.html',
  styleUrls: ['./team-details.page.scss'],
})
export class TeamDetailsPage implements OnInit {
  choosenTeam: any;
  selectedTeamDetails: any;
  selectedSegment: any;
  showSquad: boolean = false;
  goalKeepersArray: any[] = [];
  defendersArray: any[] = [];
  midFieldersArray: any[] = [];
  forwardsArray: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, 
              private teamService: AppService, private _location: Location,
              private nativePageTransitions: NativePageTransitions) {}

  ngOnInit() {
    this.selectedSegment = 'profile';
    this.route.params.subscribe((params) => {
      console.log(params.team);
      this.choosenTeam = JSON.parse(params.team);
      this.getTeamDetails();
    });
  }

  getTeamDetails() {
    this.teamService.getTeamDetailsById(this.choosenTeam)
          .subscribe((data) => {
            this.selectedTeamDetails = data;
            console.log(this.selectedTeamDetails);
            this.formatSquad();
    });
  }

  formatSquad() {
    if(this.selectedTeamDetails.length > 0) {
      this.selectedTeamDetails[0].map((player) => {
        switch(player.position_name) {
          case 'Forward':
            this.forwardsArray.push(player);
            break;
          case 'Midfielder':
            this.midFieldersArray.push(player);
            break;
          case 'Defender':
            this.defendersArray.push(player);
            break;
          case 'Goalkeeper':
            this.goalKeepersArray.push(player);
            break;
          default:
            break;
        }
      });
    }
  }

  segmentChanged(event) {
    console.log(event.detail.value);
    if(event.detail.value === 'profile') {
      this.showSquad = false;
    } else{
      this.showSquad = true;
    }
  }

  goBack() {
    console.log(this._location);
    this._location.back();
    this.applyTransition();
  }

  applyTransition() {
    let options: NativeTransitionOptions = {
      direction: 'right',
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
