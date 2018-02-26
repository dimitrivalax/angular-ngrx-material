import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { ActionSongSterrRetrieve, selectorSongSterr } from './song-sterr.reducer';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';

@Component({
  selector: 'anms-song-sterr',
  templateUrl: './song-sterr.component.html',
  styleUrls: ['./song-sterr.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongSterrComponent implements OnInit, OnDestroy {

  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;

  private unsubscribe$: Subject<void> = new Subject<void>();

  intiatlized;
  songSterr;

  constructor(public store: Store<any>, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.intiatlized = false;
    this.store
      .select(selectorSongSterr)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((songSterr: any) => {
        this.songSterr = songSterr;
        this.cd.markForCheck();
        if (!this.intiatlized) {
          this.intiatlized = true;
          this.store.dispatch(new ActionSongSterrRetrieve({ artist: songSterr.artist }));
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onArtistChange(artist: string) {
    this.store.dispatch(new ActionSongSterrRetrieve({ artist }));
  }
}
