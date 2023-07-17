import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedIdxMlsSolutionComponent } from './advanced-idx-mls-solution.component';

describe('AdvancedIdxMlsSolutionComponent', () => {
  let component: AdvancedIdxMlsSolutionComponent;
  let fixture: ComponentFixture<AdvancedIdxMlsSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [AdvancedIdxMlsSolutionComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedIdxMlsSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
