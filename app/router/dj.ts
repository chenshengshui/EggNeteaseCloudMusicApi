import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/dj/banner', controller.dj.getDjBanner);
  router.get('/dj/category/excludehot', controller.dj.getNonHotCategory);
  router.get('/dj/category/rec', controller.dj.getRecCategory);
  router.get('/dj/category/list', controller.dj.getCategoryList);
  router.get('/dj/:djId/detail', controller.dj.getDjDetail);
};
