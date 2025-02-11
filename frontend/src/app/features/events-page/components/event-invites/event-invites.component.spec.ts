import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInvitesComponent } from './event-invites.component';

describe('EventInvitesComponent', () => {
  let component: EventInvitesComponent;
  let fixture: ComponentFixture<EventInvitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventInvitesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
