import { TestBed, inject } from '@angular/core/testing';

import { TranslationEditorService } from './translation-editor.service';

describe('TranslationEditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslationEditorService]
    });
  });

  it('should be created', inject([TranslationEditorService], (service: TranslationEditorService) => {
    expect(service).toBeTruthy();
  }));
});
