import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefferalDashboardComponent } from './refferal-dashboard.component';

describe('RefferalDashboardComponent', () => {
  let component: RefferalDashboardComponent;
  let fixture: ComponentFixture<RefferalDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [RefferalDashboardComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefferalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
