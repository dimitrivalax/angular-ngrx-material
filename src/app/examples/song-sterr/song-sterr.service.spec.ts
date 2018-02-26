import { TestBed, inject } from '@angular/core/testing';

import { SongSterrService } from './song-sterr.service';

describe('SongSterrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SongSterrService]
    });
  });

  it('should be created', inject([SongSterrService], (service: SongSterrService) => {
    expect(service).toBeTruthy();
  }));
});
