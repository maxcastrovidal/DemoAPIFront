import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosDetailsComponent } from './vehiculos-details.component';

describe('VehiculosDetailsComponent', () => {
  let component: VehiculosDetailsComponent;
  let fixture: ComponentFixture<VehiculosDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiculosDetailsComponent]
    });
    fixture = TestBed.createComponent(VehiculosDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
