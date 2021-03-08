import {Injectable} from '@angular/core';
import {StreamingPlatformService} from '../interfaces/streaming-platform-service';
import {ParsedUrl} from '../interfaces/parsed-url';
import {CommonUtils} from '../utils/common.utils';
import {SpotifyConfig} from '../config/spotify.config';
import {StreamingPlatform} from '../interfaces/streaming-platform';
import {Observable, throwError} from 'rxjs';
import {SpotifyApiService} from './api/spotify-api.service';
import {catchError, map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService implements StreamingPlatformService {

  constructor(private readonly spotifyApiService: SpotifyApiService) {
  }

  private isSpotifyPlaylist(url: string): boolean {
    if (CommonUtils.isNull(url)) {
      return false;
    }
    return url.startsWith(SpotifyConfig.PLAYLIST_URL_IDENTIFICATION.start);
  }

  private getPlaylistName(playlistIdentifier: string): Observable<string> {
    if (CommonUtils.isNull(playlistIdentifier)) {
      return throwError('Bad playlist id parameter');
    }
    return this.spotifyApiService.getPlaylistInfos(playlistIdentifier)
      .pipe(
        take(1),
        map(informations => informations?.name)
      );
  }

  parseUrl(url: string): Observable<ParsedUrl> {
    if (!this.isSpotifyPlaylist(url)) {
      return throwError('This url dosn\'t belong to Spotify');
    }

    let playlistIdentifier = url.slice(SpotifyConfig.PLAYLIST_URL_IDENTIFICATION.start.length);
    const indexToSlice = playlistIdentifier.search(/[/?]/);
    if (indexToSlice >= 0) {
      playlistIdentifier = playlistIdentifier.slice(0, indexToSlice);
    }

    return this.getPlaylistName(url)
      .pipe(
        catchError((error) => throwError(error)),
        map(playlistName => Object.assign({}, {
          playlistName: playlistName ?? null,
          playlistIdentifier,
          source: StreamingPlatform.SPOTIFY
        }))
      );
  }
}
