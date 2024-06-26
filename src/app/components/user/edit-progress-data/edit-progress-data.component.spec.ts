import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgressDataComponent } from './edit-progress-data.component';

describe('EditProgressDataComponent', () => {
  let component: EditProgressDataComponent;
  let fixture: ComponentFixture<EditProgressDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProgressDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProgressDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
