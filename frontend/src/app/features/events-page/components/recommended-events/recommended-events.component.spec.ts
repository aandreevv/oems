import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedEventsComponent } from './recommended-events.component';

describe('RecommendedEventsComponent', () => {
  let component: RecommendedEventsComponent;
  let fixture: ComponentFixture<RecommendedEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecommendedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
