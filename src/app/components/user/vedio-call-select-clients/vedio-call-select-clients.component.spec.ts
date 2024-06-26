import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VedioCallSelectClientsComponent } from './vedio-call-select-clients.component';

describe('VedioCallSelectClientsComponent', () => {
  let component: VedioCallSelectClientsComponent;
  let fixture: ComponentFixture<VedioCallSelectClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VedioCallSelectClientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VedioCallSelectClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
