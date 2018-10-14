import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-key-events',
  templateUrl: './key-events.component.html',
  styleUrls: ['./key-events.component.scss']
})
export class KeyEventsComponent implements OnInit {
  matchTimeline: any[] = [];
  items = [
    {
      title: 'Goal',
      content: 'Goal Scored: Ronaldo Assist by: Ozil',
      icon: 'football',
      time: {title: '12'}
    },
    {
      title: 'Goal',
      content: 'Goal Scored: Ronaldo Assist by: Ozil',
      icon: 'football',
      time: {title: '12'}
    },
    {
      title: 'Goal',
      content: 'Goal Scored: Ronaldo Assist by: Ozil',
      icon: 'football',
      time: {title: '12'}
    }
  ];
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
                time: timeline[timelineData].time,
                team: timeline[timelineData].teamDetails.short_name,
                playerName: timeline[timelineData].eventName === 'Goals' ? timeline[timelineData].playerDetails.playerName : null
              };
              this.matchTimeline.push(modifiedTimeline);
            });
          }
        })
      }
    })
  }

}
