import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lineups',
  templateUrl: './lineups.component.html',
  styleUrls: ['./lineups.component.scss']
})
export class LineupsComponent implements OnInit {
  @Input()
  set teamList(value: any) {
    this.formatPlayers(value);
  }
  teamOneList: any;
  fullTeamDetails: any;
  playerList: any[] = [];
  teamsList: any[] = [];
  showTeamList: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  formatPlayers(teams) {
    this.fullTeamDetails = teams;
    teams.map((team) =>  {
      this.teamsList.push({
        id: team.id,
        name: team.short_name
      });
    })
    const playerList1 = teams[0].players_involved;
    if(playerList1.length) {
      this.showTeamList = false;
    } else {
      Object.keys(playerList1).map((key) => {
        if(playerList1[key] !== '') {
          this.playerList.push(playerList1[key]);
        }
      });
      this.showTeamList = true;
    }
  }

  segmentChanged(event) {
    console.log(event.detail.value);
    const currentPlayerList = [];
    const playerList1 = this.fullTeamDetails.find(team => team.id === event.detail.value).players_involved;
    Object.keys(playerList1).map((key) => {
      if(playerList1[key] !== '') {
        currentPlayerList.push(playerList1[key]);
      }
    });
    this.playerList = [...currentPlayerList];
  }

}
