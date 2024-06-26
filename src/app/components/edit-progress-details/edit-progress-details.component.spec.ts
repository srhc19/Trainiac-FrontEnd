import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgressDetailsComponent } from './edit-progress-details.component';

describe('EditProgressDetailsComponent', () => {
  let component: EditProgressDetailsComponent;
  let fixture: ComponentFixture<EditProgressDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProgressDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProgressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
