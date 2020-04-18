import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/user/:userId/audios', controller.user.getAudios);
  router.delete('/user/cloud/song/del', controller.user.deleteCloudMusic);
  router.get('/user/cloud/songs/info', controller.user.getCloudMusicsInfo);
  router.get('/user/cloud', controller.user.getCloudMusics);
  router.get('/user/info', controller.user.getUserInfo);
  router.get('/user/djs', controller.user.getUserDjs);
  router.get('/user/event', controller.user.getUserEvent);
  router.get('/user/followeds', controller.user.getUserFolloweds);
  router.get('/user/follows', controller.user.getUserFollows);
  router.get('/user/playlist', controller.user.getUserPlaylist);
  router.get('/user/playrecord', controller.user.getUserPlayrecord);
  router.get('/user/subcount', controller.user.getUserSubcount);
  router.put('/user/info', controller.user.putUserInfo);
};
