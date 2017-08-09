import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastFilesComponent } from './last-files.component';

describe('LastFilesComponent', () => {
  let component: LastFilesComponent;
  let fixture: ComponentFixture<LastFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
