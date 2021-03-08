import {Injectable} from '@angular/core';
import {StreamingPlatformService} from '../interfaces/streaming-platform-service';
import {Observable, throwError} from 'rxjs';
import {ParsedUrl} from '../interfaces/parsed-url';
import {CommonUtils} from '../utils/common.utils';
import {catchError, map} from 'rxjs/operators';
import {AppleMusicConfig} from '../config/apple-music.config';
import {AppleMusicApiService} from './api/apple-music-api.service';
import {StreamingPlatform} from '../interfaces/streaming-platform';

@Injectable({
  providedIn: 'root'
})
export class AppleMusicService extends StreamingPlatformService {

  private streamingPlatform = StreamingPlatform.APPLE_MUSIC;

  constructor(private readonly streamingPlatformApiService: AppleMusicApiService) {
    super();
  }

  private doesPlaylistBelongToThisService(url: string): boolean {
    if (CommonUtils.isNull(url) || !url.startsWith(AppleMusicConfig.PLAYLIST_URL_IDENTIFICATION.start)) {
      return false;
    }
    const lastUrlPart = url.split('/').pop();
    return lastUrlPart?.startsWith(AppleMusicConfig.PLAYLIST_URL_IDENTIFICATION.playlistId_prefix) ?? false;
  }

  private convertPlaylistInfoToPlaylistName(playlistInfo: any): string {
    return playlistInfo?.data?.[0].attributes?.name;
  }

  parseUrl(url: string): Observable<ParsedUrl> {
    if (!this.isAppleMusicPlaylist(url)) {
      return throwError('This url dosn\'t belong to Apple Music');
    }

    let playlistIdentifier = url.split('/').pop() ?? '';
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
