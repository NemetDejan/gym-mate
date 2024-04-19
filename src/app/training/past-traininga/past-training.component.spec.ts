import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTrainingComponent } from './past-training.component';

describe('PastTrainingaComponent', () => {
  let component: PastTrainingComponent;
  let fixture: ComponentFixture<PastTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastTrainingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
