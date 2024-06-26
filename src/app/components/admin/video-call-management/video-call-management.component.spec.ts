import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallManagementComponent } from './video-call-management.component';

describe('VideoCallManagementComponent', () => {
  let component: VideoCallManagementComponent;
  let fixture: ComponentFixture<VideoCallManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoCallManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoCallManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
