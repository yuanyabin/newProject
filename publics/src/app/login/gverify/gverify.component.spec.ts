import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GverifyComponent } from './gverify.component';

describe('GverifyComponent', () => {
  let component: GverifyComponent;
  let fixture: ComponentFixture<GverifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GverifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
