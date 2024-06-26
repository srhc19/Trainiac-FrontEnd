import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerificationOtpComponent } from './email-verification-otp.component';

describe('EmailVerificationOtpComponent', () => {
  let component: EmailVerificationOtpComponent;
  let fixture: ComponentFixture<EmailVerificationOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailVerificationOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailVerificationOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
