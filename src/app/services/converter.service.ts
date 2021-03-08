import {Injectable} from '@angular/core';
import {ParsedUrl} from '../interfaces/parsed-url';
import {Observable} from 'rxjs';
import {SpotifyService} from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor(private readonly spotifyService: SpotifyService) {
  }


  parseUrl(value: string): Observable<ParsedUrl> {
    return this.spotifyService.parseUrl(value)
      .pipe(
        // catchError(() => {})
      );
  }
}
