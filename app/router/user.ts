import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/user/:userId/audios', controller.user.getAudios);
};
