import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/artist/:id/albums', controller.artist.getArtistAlbums);
  router.get('/artist/:id/info', controller.artist.getArtistInfo);
};
