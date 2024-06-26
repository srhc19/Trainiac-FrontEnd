import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VedioCallInputComponent } from './vedio-call-input.component';

describe('VedioCallInputComponent', () => {
  let component: VedioCallInputComponent;
  let fixture: ComponentFixture<VedioCallInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VedioCallInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VedioCallInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
