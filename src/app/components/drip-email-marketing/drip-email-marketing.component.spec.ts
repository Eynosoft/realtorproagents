import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DripEmailMarketingComponent } from './drip-email-marketing.component';

describe('DripEmailMarketingComponent', () => {
  let component: DripEmailMarketingComponent;
  let fixture: ComponentFixture<DripEmailMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [DripEmailMarketingComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DripEmailMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
