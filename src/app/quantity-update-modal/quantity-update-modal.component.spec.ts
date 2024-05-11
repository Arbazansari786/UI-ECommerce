import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityUpdateModalComponent } from './quantity-update-modal.component';

describe('QuantityUpdateModalComponent', () => {
  let component: QuantityUpdateModalComponent;
  let fixture: ComponentFixture<QuantityUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuantityUpdateModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuantityUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
