import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogListClientComponent } from './blog-list-client.component';

describe('BlogListClientComponent', () => {
  let component: BlogListClientComponent;
  let fixture: ComponentFixture<BlogListClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogListClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogListClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
