import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterFeedPage } from './twitter-feed.page';

describe('TwitterFeedPage', () => {
  let component: TwitterFeedPage;
  let fixture: ComponentFixture<TwitterFeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterFeedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterFeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
