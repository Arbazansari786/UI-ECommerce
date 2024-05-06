import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedProductComponent } from './interested-product.component';

describe('InterestedProductComponent', () => {
  let component: InterestedProductComponent;
  let fixture: ComponentFixture<InterestedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterestedProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterestedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
