import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/top/album', controller.top.getTopAlbum);
  router.get('/top/artist', controller.top.getTopArtist);
};
