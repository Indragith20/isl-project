import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-key-events',
  templateUrl: './key-events.component.html',
  styleUrls: ['./key-events.component.scss']
})
export class KeyEventsComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {
  }

}
