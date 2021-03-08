export class AppleMusicConfig {
  private static DOMAINS = {
    api: 'https://api.music.apple.com/v1',
    player: 'https://music.apple.com'
  };

  static PLAYLIST_URL_IDENTIFICATION = {
    start: `${AppleMusicConfig.DOMAINS.player}`,
    playlistId_prefix: 'pl.'
  };

  static API_URLS = {
    playlist_info: `${AppleMusicConfig.DOMAINS.api}/catalog/:storefront/playlists/:playlist_id`,
    playlists: `${AppleMusicConfig.DOMAINS.api}/me/library/playlists`,
    songs: `${AppleMusicConfig.DOMAINS.api}/catalog/fr/songs`,
    generatedPlaylist: `${AppleMusicConfig.DOMAINS.player}/library/playlist/:id`
  };
}
