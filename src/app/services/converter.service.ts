import {Injectable} from '@angular/core';
import {ParsedUrl} from '../interfaces/parsed-url';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor() {
  }


  parseUrl(value: string): Observable<ParsedUrl | null> {
    return of(null);
  }
}
