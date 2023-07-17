import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DripEmailMarketingSidebarComponent } from './drip-email-marketing-sidebar.component';

describe('DripEmailMarketingSidebarComponent', () => {
  let component: DripEmailMarketingSidebarComponent;
  let fixture: ComponentFixture<DripEmailMarketingSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [DripEmailMarketingSidebarComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DripEmailMarketingSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
