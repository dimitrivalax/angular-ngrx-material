import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { switchMap } from 'rxjs/operators/switchMap';
import { catchError } from 'rxjs/operators/catchError';

import { LocalStorageService } from '@app/core';

import {
  ActionSongSterrRetrieve,
  ActionSongSterrRetrieveError,
  ActionSongSterrRetrieveSuccess,
  SONG_STRERR_KEY,
  SongSterrActionTypes
} from './song-sterr.reducer';
import { SongSterrService } from './song-sterr.service';

@Injectable()
export class SongSterrEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private service: SongSterrService
  ) {}

  @Effect()
  retrieveStock(): Observable<Action> {
    return this.actions$
    .ofType(SongSterrActionTypes.RETRIEVE)
    .pipe(
      tap((action: ActionSongSterrRetrieve) =>
        this.localStorageService.setItem(SONG_STRERR_KEY, {
          artist: action.payload.artist
        })
      ),
      distinctUntilChanged(),
      debounceTime(500),
      switchMap((action: ActionSongSterrRetrieve) =>
        this.service
          .retrieveSongsByArtist(action.payload.artist)
          .pipe(
            map(songs => new ActionSongSterrRetrieveSuccess({ songs })),
            catchError(error =>
              of(new ActionSongSterrRetrieveError({ error }))
            )
          )
      )
    );
  }
}
