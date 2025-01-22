import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoffeeDialogComponent } from './add-coffee-dialog.component';

describe('AddCoffeeDialogComponent', () => {
  let component: AddCoffeeDialogComponent;
  let fixture: ComponentFixture<AddCoffeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCoffeeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCoffeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
