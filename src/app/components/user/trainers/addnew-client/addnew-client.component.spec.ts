import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewClientComponent } from './addnew-client.component';

describe('AddnewClientComponent', () => {
  let component: AddnewClientComponent;
  let fixture: ComponentFixture<AddnewClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddnewClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddnewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
