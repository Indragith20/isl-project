import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyEventsComponent } from './key-events.component';

describe('KeyEventsComponent', () => {
  let component: KeyEventsComponent;
  let fixture: ComponentFixture<KeyEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
