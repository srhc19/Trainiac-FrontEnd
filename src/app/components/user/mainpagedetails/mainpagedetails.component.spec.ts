import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainpagedetailsComponent } from './mainpagedetails.component';

describe('MainpagedetailsComponent', () => {
  let component: MainpagedetailsComponent;
  let fixture: ComponentFixture<MainpagedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainpagedetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainpagedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
