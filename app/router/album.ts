import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get(
    '/album/:albumId/detail/dynamic',
    controller.album.getAlbumDynamicInfo
  );
};
