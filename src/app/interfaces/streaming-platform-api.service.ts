import {Observable} from 'rxjs';

export interface StreamingPlatformApiService {
  getPlaylistInfos(playlistIdentifier: string): Observable<any>;
}
