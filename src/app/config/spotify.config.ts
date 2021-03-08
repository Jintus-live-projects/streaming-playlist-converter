export class SpotifyConfig {
  private static DOMAINS = {
    accounts: 'https://accounts.spotify.com/api',
    api: 'https://api.spotify.com/v1'
  };

  static PLAYLIST_URL_IDENTIFICATION = {
    start: 'https://open.spotify.com/playlist/'
  };

  static API_URLS = {
    client_token: `${SpotifyConfig.DOMAINS.accounts}/token`,
    playlist: `${SpotifyConfig.DOMAINS.api}/playlists/:playlist_id`,
    playlist_tracks: `${SpotifyConfig.DOMAINS.api}/playlists/:playlist_id/tracks`
  };
}
