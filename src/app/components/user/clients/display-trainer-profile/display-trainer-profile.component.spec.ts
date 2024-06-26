import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTrainerProfileComponent } from './display-trainer-profile.component';

describe('DisplayTrainerProfileComponent', () => {
  let component: DisplayTrainerProfileComponent;
  let fixture: ComponentFixture<DisplayTrainerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayTrainerProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayTrainerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
