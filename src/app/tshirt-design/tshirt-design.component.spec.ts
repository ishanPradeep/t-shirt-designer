import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TshirtDesignComponent } from './tshirt-design.component';

describe('TshirtDesignComponent', () => {
  let component: TshirtDesignComponent;
  let fixture: ComponentFixture<TshirtDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TshirtDesignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TshirtDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
