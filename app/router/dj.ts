import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/dj/banner', controller.dj.getDjBanner);
  router.get('/dj/category/excludehot', controller.dj.getNonHotCategory);
  router.get('/dj/category/rec', controller.dj.getRecCategory);
  router.get('/dj/category/list', controller.dj.getCategoryList);
  router.get('/dj/:djId/detail', controller.dj.getDjDetail);
  router.get('/dj/hot', controller.dj.getHotDjs);
  router.get('/dj/paygift', controller.dj.getPaygiftDjs);
  router.get('/dj/:djId/program/detail', controller.dj.getDjProgramDetail);
  router.get(
    '/dj/program/toplist/hours',
    controller.dj.getDjToplistHoursProgram
  );
  router.get('/dj/program/toplist', controller.dj.getDjToplistProgram);
  router.get('/dj/:djId/program/list', controller.dj.getDjProgramList);
  router.get('/dj/catgory/:catgoryId/djs', controller.dj.getCatgoryHotDjs);
};
