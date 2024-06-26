import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutlistingComponent } from './workoutlisting.component';

describe('WorkoutlistingComponent', () => {
  let component: WorkoutlistingComponent;
  let fixture: ComponentFixture<WorkoutlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutlistingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
