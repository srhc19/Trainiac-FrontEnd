import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YogaModalComponent } from './yoga-modal.component';

describe('YogaModalComponent', () => {
  let component: YogaModalComponent;
  let fixture: ComponentFixture<YogaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YogaModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YogaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
