import { Component, OnInit } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { AppService } from '../services/app.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {
  selectedDate: any;
  showWarningCard: boolean = false;
  matchDetailsArray: any[] = [];
  constructor(private datePicker: DatePicker, private matchService: AppService,
              private datePipe: DatePipe, private router: Router, private nativePageTransitions: NativePageTransitions) { }

  ngOnInit() {
    // TODO: Remove this hardcoded date
    this.selectedDate = new Date("September 29, 2018");
    console.log(this.selectedDate);
    this.getMatches();
  }

  showDatePicker() {
    this.datePicker.show({
      date: this.selectedDate,
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.selectedDate = date;
        this.getMatches();
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  goToNextDate() {
    const currentDate = new Date(this.selectedDate);
    currentDate.setDate(currentDate.getDate() + 1);
    this.selectedDate = currentDate;
    this.getMatches();
  }

  goToPreviousDate() {
    const currentDate = new Date(this.selectedDate);
    currentDate.setDate(currentDate.getDate() - 1);
    this.selectedDate = currentDate;
    this.getMatches();
  }

  goToToday() {
    this.selectedDate = new Date();
    this.getMatches();
  }

  getMatches() {
    this.matchDetailsArray = [];
    let searchDateString = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
    searchDateString = `${searchDateString}T19:30+05:30`;
    this.matchService.getMatches(searchDateString).then((matchData: any) => {
      if(matchData === null) {
        this.showWarningCard = true;
        console.log(matchData);
      } else {
        console.log(matchData);
        this.showWarningCard = false;
         matchData.filter((match) => {
          if(match.start_date === searchDateString) {
            const matchStartDate = new Date(match.start_date);
            const modifiedMatchDetails = {
              ...match,
              eventId: match.series_id,
              matchId: match.event_name,
              stadium: match.venue_name,
              team1: this.matchService.getlocalTeamId(match.participants[0].id),
              team2: this.matchService.getlocalTeamId(match.participants[1].id),
              date: this.datePipe.transform(matchStartDate, 'dd-MMM-yyyy'),
              time: this.datePipe.transform(matchStartDate, 'shortTime'),
            };
            this.matchDetailsArray.push(modifiedMatchDetails);
          }
        });
        console.log(this.matchDetailsArray);
        if(this.matchDetailsArray.length === 0) {
          this.showWarningCard = true;
        }
      }
    });
  }

  goToMatchDetails(matchData) {
    this.matchService.setSelectedMatch(matchData);
    this.router.navigate(['/match-details']);
    this.applyTransition();
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
