import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationEditorPageComponent } from './translation-editor-page.component';

describe('TranslationEditorPageComponent', () => {
  let component: TranslationEditorPageComponent;
  let fixture: ComponentFixture<TranslationEditorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationEditorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationEditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
