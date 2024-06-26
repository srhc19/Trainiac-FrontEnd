import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogContentClientComponent } from './blog-content-client.component';

describe('BlogContentClientComponent', () => {
  let component: BlogContentClientComponent;
  let fixture: ComponentFixture<BlogContentClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogContentClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogContentClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
