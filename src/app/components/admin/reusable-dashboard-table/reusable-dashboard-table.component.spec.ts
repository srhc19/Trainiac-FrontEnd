import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableDashboardTableComponent } from './reusable-dashboard-table.component';

describe('ReusableDashboardTableComponent', () => {
  let component: ReusableDashboardTableComponent;
  let fixture: ComponentFixture<ReusableDashboardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableDashboardTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReusableDashboardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
