import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCompaignEmilComponent } from './schedule-compaign-emil.component';

describe('ScheduleCompaignEmilComponent', () => {
  let component: ScheduleCompaignEmilComponent;
  let fixture: ComponentFixture<ScheduleCompaignEmilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ScheduleCompaignEmilComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleCompaignEmilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
