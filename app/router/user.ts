import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/user/:userId/audios', controller.user.getAudios);
  router.delete('/user/cloud/song/del', controller.user.deleteCloudMusic);
  router.get('/user/cloud/song', controller.user.getCloudMusicsInfo);
};
