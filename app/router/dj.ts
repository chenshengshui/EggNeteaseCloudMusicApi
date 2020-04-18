import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/dj/banner', controller.dj.getDjBanner);
  router.get('/dj/category/excludehot', controller.dj.getNonHotCategory);
};
