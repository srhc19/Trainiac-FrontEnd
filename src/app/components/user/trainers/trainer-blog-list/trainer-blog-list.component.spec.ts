import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerBlogListComponent } from './trainer-blog-list.component';

describe('TrainerBlogListComponent', () => {
  let component: TrainerBlogListComponent;
  let fixture: ComponentFixture<TrainerBlogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerBlogListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerBlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
