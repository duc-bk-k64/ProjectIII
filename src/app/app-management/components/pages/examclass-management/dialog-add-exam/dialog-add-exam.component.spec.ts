import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddExamComponent } from './dialog-add-exam.component';

describe('DialogAddExamComponent', () => {
  let component: DialogAddExamComponent;
  let fixture: ComponentFixture<DialogAddExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddExamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
