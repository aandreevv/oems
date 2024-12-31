import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInvitesModalComponent } from './event-invites-modal.component';

describe('EventInvitesModalComponent', () => {
  let component: EventInvitesModalComponent;
  let fixture: ComponentFixture<EventInvitesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventInvitesModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventInvitesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
