import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayClientProfileComponent } from './display-client-profile.component';

describe('DisplayClientProfileComponent', () => {
  let component: DisplayClientProfileComponent;
  let fixture: ComponentFixture<DisplayClientProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayClientProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayClientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
