import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProfileUpdateComponent } from './client-profile-update.component';

describe('ClientProfileUpdateComponent', () => {
  let component: ClientProfileUpdateComponent;
  let fixture: ComponentFixture<ClientProfileUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientProfileUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
