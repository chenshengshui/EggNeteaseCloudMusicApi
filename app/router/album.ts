import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get(
    '/album/:albumId/detail/dynamic',
    controller.album.getAlbumDynamicInfo
  );
  router.get('/album/latest', controller.album.getLatestAlbum);
  router.post('/album/:albumId/sub/:actionType', controller.album.postAlbumSub);
};
