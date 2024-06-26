import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersMessagesComponent } from './trainers-messages.component';

describe('TrainersMessagesComponent', () => {
  let component: TrainersMessagesComponent;
  let fixture: ComponentFixture<TrainersMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainersMessagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainersMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
