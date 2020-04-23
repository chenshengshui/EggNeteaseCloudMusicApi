import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/mv/list', controller.mv.getMvList);
};
