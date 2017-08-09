import { TestBed, inject } from '@angular/core/testing';

import { LastFilesService } from './last-files.service';

describe('LastFilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LastFilesService]
    });
  });

  it('should be created', inject([LastFilesService], (service: LastFilesService) => {
    expect(service).toBeTruthy();
  }));
});
