import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/top/album', controller.top.getTopAlbum);
  router.get('/top/artist', controller.top.getTopArtist);
  router.get('/top/list', controller.top.getTopList);
  router.get('/top/mv', controller.top.getTopMv);
  router.get('/top/quality/playlist', controller.top.getQualityPlaylist);
  router.get('/top/playlist', controller.top.getTopPlaylist);
};
