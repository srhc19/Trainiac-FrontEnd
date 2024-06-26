import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymModalComponent } from './gym-modal.component';

describe('GymModalComponent', () => {
  let component: GymModalComponent;
  let fixture: ComponentFixture<GymModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GymModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
