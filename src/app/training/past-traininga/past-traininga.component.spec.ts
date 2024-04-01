import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTrainingaComponent } from './past-traininga.component';

describe('PastTrainingaComponent', () => {
  let component: PastTrainingaComponent;
  let fixture: ComponentFixture<PastTrainingaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastTrainingaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PastTrainingaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
