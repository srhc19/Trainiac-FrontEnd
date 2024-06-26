import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerprofileUpdateComponent } from './trainerprofile-update.component';

describe('TrainerprofileUpdateComponent', () => {
  let component: TrainerprofileUpdateComponent;
  let fixture: ComponentFixture<TrainerprofileUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerprofileUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerprofileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
