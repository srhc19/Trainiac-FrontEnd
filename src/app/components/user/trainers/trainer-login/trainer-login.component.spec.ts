import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerLoginComponent } from './trainer-login.component';

describe('TrainerLoginComponent', () => {
  let component: TrainerLoginComponent;
  let fixture: ComponentFixture<TrainerLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
