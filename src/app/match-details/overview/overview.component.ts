import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Input() teamOne: any;
  @Input() teamTwo: any;
  @Input() eventDetails: any;
  @Input() headToHeadStats: any;
  @Output() teamSelected = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {

  }

  navigateToTeamDetails(teamDetails) {
    this.teamSelected.emit(teamDetails);
  }

}
