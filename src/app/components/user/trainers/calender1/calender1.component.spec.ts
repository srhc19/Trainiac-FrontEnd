import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calender1Component } from './calender1.component';

describe('Calender1Component', () => {
  let component: Calender1Component;
  let fixture: ComponentFixture<Calender1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calender1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Calender1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
