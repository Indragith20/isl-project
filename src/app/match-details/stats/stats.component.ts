import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input()
  set statsData(value: any) {
    if(value) {
      this.showWarning = false;
      this.showStatsData(value);
    } else {
      this.showWarning = true;
    }    
  }
  @Input() teamOneName: string;
  @Input() teamTwoName: string;

  showWarning: boolean = true;
  matchStatsData: any;

  constructor() { }

  ngOnInit() {
  }

  showStatsData(data: any) {
    this.matchStatsData = [];
    Object.keys(data).map((keyName) => {
      this.matchStatsData.push(data[keyName]);
    });
  }

}
