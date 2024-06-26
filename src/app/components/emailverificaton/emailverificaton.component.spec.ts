import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailverificatonComponent } from './emailverificaton.component';

describe('EmailverificatonComponent', () => {
  let component: EmailverificatonComponent;
  let fixture: ComponentFixture<EmailverificatonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailverificatonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailverificatonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
