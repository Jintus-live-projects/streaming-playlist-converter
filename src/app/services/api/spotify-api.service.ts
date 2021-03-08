import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {CommonUtils} from '../../utils/common.utils';
import {SpotifyConfig} from '../../config/spotify.config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  constructor(private readonly http: HttpClient) {
  }

  getPlaylistInfos(playlistIdentifier: string): Observable<any> {
    if (CommonUtils.isNull(playlistIdentifier)) {
      return throwError('Bad playlist identifier.');
    }
    const url = SpotifyConfig.API_URLS.playlist.replace(':playlist_id', playlistIdentifier);
    return this.http.get<any>(url);
  }
}
