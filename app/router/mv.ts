import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/mv/list', controller.mv.getMvList);
  router.get('/mv/:mvId/detail', controller.mv.getMvDetail);
};
