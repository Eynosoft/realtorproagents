import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportSystemDetailedComponent } from './support-system-detailed.component';

describe('SupportSystemDetailedComponent', () => {
  let component: SupportSystemDetailedComponent;
  let fixture: ComponentFixture<SupportSystemDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [SupportSystemDetailedComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportSystemDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
