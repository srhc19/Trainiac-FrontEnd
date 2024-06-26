import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerBlogContentComponent } from './trainer-blog-content.component';

describe('TrainerBlogContentComponent', () => {
  let component: TrainerBlogContentComponent;
  let fixture: ComponentFixture<TrainerBlogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerBlogContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerBlogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
