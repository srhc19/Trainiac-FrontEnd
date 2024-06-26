import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestimonialComponent } from './add-testimonial.component';

describe('AddTestimonialComponent', () => {
  let component: AddTestimonialComponent;
  let fixture: ComponentFixture<AddTestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTestimonialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
