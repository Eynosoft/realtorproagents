import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DripEmailCampaignsEmailComponent } from './drip-email-campaigns-email.component';

describe('DripEmailCampaignsEmailComponent', () => {
  let component: DripEmailCampaignsEmailComponent;
  let fixture: ComponentFixture<DripEmailCampaignsEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [DripEmailCampaignsEmailComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DripEmailCampaignsEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
