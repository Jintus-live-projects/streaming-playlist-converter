import {Observable, throwError} from 'rxjs';
import {ParsedUrl} from '../interfaces/parsed-url';
import {StreamingPlatform} from '../interfaces/streaming-platform';
import {StreamingPlatformApiService} from '../interfaces/streaming-platform-api.service';
import {catchError, map, take} from 'rxjs/operators';
import {CommonUtils} from '../utils/common.utils';

export abstract class StreamingPlatformService {

  protected abstract streamingPlatform: StreamingPlatform;
  protected abstract streamingPlatformApiService: StreamingPlatformApiService;

  protected abstract doesPlaylistBelongToThisService(url: string): boolean;

  protected abstract convertUrlToPlaylistIdentifier(url: string): string;

  protected abstract convertPlaylistInfoToPlaylistName(playlistInfo: any): string;

  private getPlaylistName(playlistIdentifier: string): Observable<string> {
    if (CommonUtils.isNull(playlistIdentifier)) {
      return throwError('Bad playlist id parameter');
    }
    return this.streamingPlatformApiService.getPlaylistInfos(playlistIdentifier)
      .pipe(
        take(1),
        map(this.convertPlaylistInfoToPlaylistName)
      );
  }

  parseUrl(url: string): Observable<ParsedUrl> {
    url = CommonUtils.removeParametersFromUrl(url);

    if (!this.doesPlaylistBelongToThisService(url)) {
      return throwError('This url dosn\'t belong to this service');
    }

    const playlistIdentifier = this.convertUrlToPlaylistIdentifier(url);

    return this.getPlaylistName(url)
      .pipe(
        catchError((error) => throwError(error)),
        map(playlistName => Object.assign({}, {
          playlistName: playlistName ?? null,
          playlistIdentifier,
          source: this.streamingPlatform
        }))
      );
  }
}
