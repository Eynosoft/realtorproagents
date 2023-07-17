import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DripEmailSettingComponent } from './drip-email-setting.component';

describe('DripEmailSettingComponent', () => {
  let component: DripEmailSettingComponent;
  let fixture: ComponentFixture<DripEmailSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [DripEmailSettingComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DripEmailSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
