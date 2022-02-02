import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { List_DemandeComponent } from './List_DemandeDemandeur.component';

describe('List_AffectationsComponent', () => {
  let component: List_DemandeComponent;
  let fixture: ComponentFixture<List_DemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [List_DemandeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(List_DemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
