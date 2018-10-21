import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-key-events',
  templateUrl: './key-events.component.html',
  styleUrls: ['./key-events.component.scss']
})
export class KeyEventsComponent implements OnInit {
  matchTimeline: any[] = [];
  showEvent: boolean = false;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getTimelineEvents().subscribe((data: any) => {
      if(data && data.length > 0) {
        data.map((matchData) => {
          if(matchData && matchData.event_timeline) {
            const timeline = matchData.event_timeline;
            this.matchTimeline = [];
            Object.keys(timeline).map((timelineData) => {
              const modifiedTimeline = {
                eventName: timeline[timelineData].eventName,
                score: timeline[timelineData].scoreline,
                time: timeline[timelineData].time,
                showEvent: timeline[timelineData].eventName === 'Match Started' ? false : true,
                team: timeline[timelineData].teamDetails.short_name,
                playerName: timeline[timelineData].eventName === 'Goal' ? timeline[timelineData].playerDetails.playerName : null
              };
              this.matchTimeline.push(modifiedTimeline);
            });
            this.matchTimeline.reverse();
          }
        })
      }
    })
  }

}
