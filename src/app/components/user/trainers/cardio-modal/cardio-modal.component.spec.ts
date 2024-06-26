import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardioModalComponent } from './cardio-modal.component';

describe('CardioModalComponent', () => {
  let component: CardioModalComponent;
  let fixture: ComponentFixture<CardioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardioModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
