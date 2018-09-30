import { Component, OnInit, Input } from '@angular/core';
import { MatchConstants } from '../../../constants/matches.constants';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  @Input()
  set playerList(value: any) {
    this.formatPlayersList(value);
  }
  startList: any[] = [];
  subsList: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  formatPlayersList(playersList) {
    console.log(playersList);
    this.startList = [];
    this.subsList = [];
    playersList.map((player) => {
      if(player.role === MatchConstants.Starter) {
        this.startList.push(player);
      } else {
        this.subsList.push(player);
      }
    })
  }

}
