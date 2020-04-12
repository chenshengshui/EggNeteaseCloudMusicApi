import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/artist/list', controller.artist.getArtistList);
  router.get('/artist/:artistId/albums', controller.artist.getArtistAlbums);
  router.get('/artist/:artistId/brief', controller.artist.getArtistBrief);
  router.get('/artist/:artistId/mv', controller.artist.getArtistMv);
  router.get('/artist/:artistId/top/song', controller.artist.getArtistTopSong);
  router.post(
    '/artist/:artistId/sub/:actionType',
    controller.artist.postArtistSub
  );
  router.get('/artist/sublist', controller.artist.getArtistSublist);
};
