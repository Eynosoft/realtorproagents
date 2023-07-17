import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPropertyAlertComponent } from './email-property-alert.component';

describe('EmailPropertyAlertComponent', () => {
  let component: EmailPropertyAlertComponent;
  let fixture: ComponentFixture<EmailPropertyAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [EmailPropertyAlertComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailPropertyAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
