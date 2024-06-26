import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSystemTrainerComponent } from './chat-systemtrainer.component';

describe('ChatSystemComponent', () => {
  let component: ChatSystemTrainerComponent;
  let fixture: ComponentFixture<ChatSystemTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatSystemTrainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatSystemTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
