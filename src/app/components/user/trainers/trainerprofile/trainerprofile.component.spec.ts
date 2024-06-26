import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerprofileComponent } from './trainerprofile.component';

describe('TrainerprofileComponent', () => {
  let component: TrainerprofileComponent;
  let fixture: ComponentFixture<TrainerprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
