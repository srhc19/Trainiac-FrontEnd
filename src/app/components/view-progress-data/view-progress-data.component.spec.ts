import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProgressDataComponent } from './view-progress-data.component';

describe('ViewProgressDataComponent', () => {
  let component: ViewProgressDataComponent;
  let fixture: ComponentFixture<ViewProgressDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProgressDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewProgressDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
