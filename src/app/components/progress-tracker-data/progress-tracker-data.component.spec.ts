import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressTrackerDataComponent } from './progress-tracker-data.component';

describe('ProgressTrackerDataComponent', () => {
  let component: ProgressTrackerDataComponent;
  let fixture: ComponentFixture<ProgressTrackerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressTrackerDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgressTrackerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
