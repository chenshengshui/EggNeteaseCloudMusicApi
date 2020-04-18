import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/video/:videoId/detail', controller.video.getVideoInfo);
  router.get('/video/group/list', controller.video.getVideoGroupList);
  router.get('/video/group/videos', controller.video.getVideoGroupVideos);
};
