import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBlogContentComponent } from './view-blog-content.component';

describe('ViewBlogContentComponent', () => {
  let component: ViewBlogContentComponent;
  let fixture: ComponentFixture<ViewBlogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBlogContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewBlogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
