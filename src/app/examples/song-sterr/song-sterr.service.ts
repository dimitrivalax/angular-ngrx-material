import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { map } from 'rxjs/operators/map';
import { Song } from '@app/examples/song-sterr/song-sterr.reducer';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const API_URL = 'https://www.songsterr.com/a/ra/songs/byartists.json?artists=';

@Injectable()
export class SongSterrService {
  constructor(private httpClient: HttpClient) {}

  retrieveSongsByArtist(artist: string): Observable<Song[]> {
    artist = '\"' + artist + '\"';
     return this.httpClient.get(API_URL + artist, { responseType: 'json' }).pipe(
      map((res: string) => res),
      map((songs: any) => (
        songs.map((song: any) => ({
          id: song.id,
          title: song.title,
          artist: song.artist,
          chordsPresent: song.chordsPresent,
          tabTypes: song.tabTypes
        }))

        ))
    );
  }
}


