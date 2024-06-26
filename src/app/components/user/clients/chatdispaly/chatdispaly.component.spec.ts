import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatdispalyComponent } from './chatdispaly.component';

describe('ChatdispalyComponent', () => {
  let component: ChatdispalyComponent;
  let fixture: ComponentFixture<ChatdispalyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatdispalyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatdispalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
