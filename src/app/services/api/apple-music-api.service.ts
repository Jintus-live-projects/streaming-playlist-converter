import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {CommonUtils} from '../../utils/common.utils';
import {AppleMusicConfig} from '../../config/apple-music.config';
import {StreamingPlatformApiService} from '../../interfaces/streaming-platform-api.service';

@Injectable({
  providedIn: 'root'
})
export class AppleMusicApiService implements StreamingPlatformApiService {

  constructor(private readonly http: HttpClient) {
  }

  getPlaylistInfos(playlistIdentifier: string): Observable<any> {
    if (CommonUtils.isNull(playlistIdentifier)) {
      return throwError('Bad playlist identifier.');
    }
    const url = AppleMusicConfig.API_URLS.playlist_info
      .replace(':storefront', 'fr')
      .replace(':playlist_id', playlistIdentifier);

    return this.http.get<any>(url);
  }
}
