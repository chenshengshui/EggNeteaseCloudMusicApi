import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get(
    '/album/:albumId/detail/dynamic',
    controller.album.getAlbumDynamicInfo
  );
  router.get('/album/latest', controller.album.getLatestAlbum);
  router.get('/album/:albumId/info', controller.album.getAlbumInfo);
  router.post('/album/:albumId/sub/:actionType', controller.album.postAlbumSub);
  router.post('/album/sublist', controller.album.getAlbumSublist);
};
