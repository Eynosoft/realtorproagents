import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectThemePageComponent } from './select-theme-page.component';

describe('SelectThemePageComponent', () => {
  let component: SelectThemePageComponent;
  let fixture: ComponentFixture<SelectThemePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [SelectThemePageComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectThemePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
