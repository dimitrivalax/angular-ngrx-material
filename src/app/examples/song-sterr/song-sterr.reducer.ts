import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const SONG_STRERR_KEY = 'EXAMPLES.SONG.STERR';

export enum SongSterrActionTypes {
  RETRIEVE = '[SongSterr] Retrieve',
  RETRIEVE_SUCCESS = '[SongSterr] Retrieve Success',
  RETRIEVE_ERROR = '[SongSterr] Retrieve Error'
}

export class ActionSongSterrRetrieve implements Action {
  readonly type = SongSterrActionTypes.RETRIEVE;
  constructor(public payload: { artist: string }) {}
}

export class ActionSongSterrRetrieveSuccess implements Action {
  readonly type = SongSterrActionTypes.RETRIEVE_SUCCESS;
  constructor(public payload: { songs: Song[] }) {}
}

export class ActionSongSterrRetrieveError implements Action {
  readonly type = SongSterrActionTypes.RETRIEVE_ERROR;
  constructor(public payload: { error: HttpErrorResponse }) {}
}

export type SongSterrActions =
  | ActionSongSterrRetrieve
  | ActionSongSterrRetrieveSuccess
  | ActionSongSterrRetrieveError;

export const initialState: SongSterrState = {
  artist: 'nirvana',
  songs: [],
  loading: false
};

export const selectorSongSterr = state => state.examples.songSterr;

export function songSterrReducer(
  state: SongSterrState = initialState,
  action: SongSterrActions
): SongSterrState {
  switch (action.type) {
    case SongSterrActionTypes.RETRIEVE:
      return {
        ...state,
        loading: true,
        songs: null,
        error: null,
        artist: action.payload.artist
      };

    case SongSterrActionTypes.RETRIEVE_SUCCESS:
      return {
        ...state,
        loading: false,
        songs: action.payload.songs,
        error: null
      };

    case SongSterrActionTypes.RETRIEVE_ERROR:
      return {
        ...state,
        loading: false,
        songs: null,
        error: action.payload.error
      };

    default:
      return state;
  }
}

export interface Song {
  id: string;
  title: string;
  artist: Artist;
  chordsPresent: boolean;
  tabTypes: string[];
}

export interface Artist {
  id: string;
  nameWithoutThePrefix: string;
  useThePrefix: boolean;
  name: string;
}

export interface SongSterrState {
  artist: string;
  loading: boolean;
  songs?: Song[];
  error?: HttpErrorResponse;
}
