import {StreamingPlatform} from './streaming-platform';

export interface ParsedUrl {
  source: StreamingPlatform;
  playlistName: string | null;
  playlistIdentifier: string;
}
