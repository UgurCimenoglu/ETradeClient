import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketComplatedDialogComponent } from './basket-complated-dialog.component';

describe('BasketComplatedDialogComponent', () => {
  let component: BasketComplatedDialogComponent;
  let fixture: ComponentFixture<BasketComplatedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketComplatedDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketComplatedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
